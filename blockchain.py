import hashlib as hl
import json
from functools import reduce

from Crypto.PublicKey.RSA import importKey

from block import Block
from transfer import Transfer
from util.hash_util import hash_block
from util.verification_util import Verification
from wallet import Wallet

# The reward we give to miners (for creating a new block)
MINING_REWARD = 10


class Blockchain:
    def __init__(self, hosting_node_id):
        self.__open_transfers = []
        # Our starting block for the blockchain
        genesis_block = Block(0, "", [], 100, 0)
        # Initializing our (empty) blockchain list
        self.__chain = [genesis_block]
        self.hosting_node = hosting_node_id
        self.__peer_nodes = set()
        self.load_data()

    def get_chain(self):
        return self.__chain

    def get_open_transfers(self):
        return self.__open_transfers

    def load_data(self):
        """Initialize blockchain + open transfers data from a file"""
        try:
            with open("blockchain.txt", mode="r") as f:
                file_content = f.readlines()
                blockchain = json.loads(file_content[0][:-1])
                # OrderedDict
                updated_blockchain = []
                for block in blockchain:
                    converted_transfers = [
                        Transfer(tx["user"], tx["signature"], tx["amount"])
                        for tx in block["transfers"]
                    ]
                    # converted_transfers = [OrderedDict(
                    #     [('user', tx['user']), ('amount', tx['amount'])]) for tx in block['transfers']]
                    updated_block = Block(
                        block["index"],
                        block["previous_hash"],
                        converted_transfers,
                        block["proof"],
                        block["timestamp"],
                    )
                    updated_blockchain.append(updated_block)
                self.__chain = updated_blockchain
                open_transfers = json.loads(file_content[1][:-1])
                # OrderedDict
                updated_transfers = []
                for tx in open_transfers:
                    updated_transfer = Transfer(
                        tx["user"], tx["signature"], tx["amount"]
                    )
                    # updated_transfer = OrderedDict(
                    #     [('user', tx['user']), ('amount', tx['amount'])])
                    updated_transfers.append(updated_transfer)
                self.__open_transfers = updated_transfers
                peer_nodes = json.loads(file_content[2])
                self.__peer_nodes = set(peer_nodes)

        except (IOError, IndexError):
            pass

    def save_data(self):
        """Save blockchain + open transactions snapshot to a file"""
        try:
            with open("blockchain.txt", mode="w") as f:
                dict_chain = []
                for block in self.__chain:
                    temp = Block(
                        block.index,
                        block.previous_hash,
                        [tx.__dict__ for tx in block.transfers],
                        block.proof,
                        block.timestamp,
                    )
                    dict_chain.append(temp.__dict__)
                f.write(json.dumps(dict_chain))
                f.write("\n")
                dict_open_transfers = [tx.__dict__ for tx in self.__open_transfers]
                f.write(json.dumps(dict_open_transfers))
                f.write("\n")
                f.write(json.dumps(list(self.__peer_nodes)))
        except IOError:
            print("Saving Data failed!")

    def proof_of_work(self):
        """Generate a proof of work for the open transfers, the hash of the previous block and a random number (which is guessed until it fits)."""
        last_block = self.__chain[-1]
        last_hash = hash_block(last_block)
        proof = 0
        # Try different PoW numbers and return the first valid one
        while not Verification.valid_proof(self.__open_transfers, last_hash, proof):
            proof += 1
        print(proof)
        return proof

    def get_balance(self):
        """Calculate and return the balance for a user."""
        if self.hosting_node == None:
            return None
        user = self.hosting_node
        tx_involving_user = [
            [tx.amount for tx in block.transfers if tx.user == user]
            for block in self.__chain
        ]
        # open_tx_sender = [tx.amount
        #                   for tx in __open_transfers if tx.user== user]
        # tx_sender.append(open_tx_sender)
        # print(tx_sender)
        total_amount = reduce(
            lambda tx_sum, tx_amt: tx_sum + sum(tx_amt)
            if len(tx_amt) > 0
            else tx_sum + 0,
            tx_involving_user,
            0,
        )
        # Return the total balance
        print("balance = ", total_amount)
        return total_amount

    def get_last_blockchain_value(self):
        """Returns the last value of the current blockchain."""
        if len(self.__chain) < 1:
            return None
        return self.__chain[-1]

    def credit_points(self, user, signature, amount=0.0):
        """Credit points to user. No checks required"""
        if self.hosting_node == None:
            return False
        transfer = Transfer(user, signature, amount)
        if not Wallet.verify_transfer(transfer):
            return False
        self.__open_transfers.append(transfer)
        # participants.add(user)
        self.save_data()
        return True

    def debit_points(self, user, signature, amount=0.0):
        """Debit points from user. Need to verify sufficient points."""
        if self.hosting_node == None:
            return False
        transfer = Transfer(user, signature, amount)
        if Verification.verify_single_transfer(transfer, self.get_balance):
            self.__open_transfers.append(transfer)
            # participants.add(user)
            self.save_data()
            return True
        return False

    # def add_transaction(recipient, sender=owner, amount=0.0):
    #     """ Append a new value as well as the last blockchain value to the blockchain.

    #     Arguments:
    #         :sender: The sender of the points.
    #         :recipient: The recipient of the points.
    #         :amount: The amount of points sent with the transaction (default = 0.0)
    #     """
    #     transaction = OrderedDict(
    #         [('sender', sender), ('recipient', recipient), ('amount', amount)])
    #     if verify_sufficient_points(transaction):
    #         __open_transfers.append(transaction)
    #         participants.add(sender)
    #         participants.add(recipient)
    #         return True
    #     return False

    def mine_block(self):
        """Create a new block and add open transfers to it."""
        if self.hosting_node == None:
            return None
        # Fetch the currently last block of the blockchain
        last_block = self.__chain[-1]
        print(last_block)
        # Hash the last block (to be able to compare it to the stored hash value)
        hashed_block = hash_block(last_block)
        proof = self.proof_of_work()
        # Miners should be rewarded, so let's create a reward transaction
        reward_transaction = Transfer(self.hosting_node, "MINING", MINING_REWARD)
        # Copy transaction instead of manipulating the original open_transactions list
        # This ensures that if for some reason the mining should fail, we don't have the reward transaction stored in the open transactions
        copied_transactions = self.__open_transfers[:]
        for tx in copied_transactions:
            if not Wallet.verify_transfer(tx):
                return None
        copied_transactions.append(reward_transaction)
        block = Block(len(self.__chain), hashed_block, copied_transactions, proof)
        self.__chain.append(block)
        self.__open_transfers = []
        self.save_data()
        return block

    def add_peer_node(self, node):
        self.__peer_nodes.add(node)
        self.save_data()

    def remove_peer_node(self, node):
        self.__peer_nodes.discard(node)
        self.save_data()

    def get_peer_nodes(self):
        """Return a list of all connected peer nodes."""
        return list(self.__peer_nodes)


# user input interface
