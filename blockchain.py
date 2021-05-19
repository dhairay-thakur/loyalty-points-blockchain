import hashlib as hl
import json
from collections import OrderedDict
from functools import reduce

from block import Block
from hash_util import hash_block
from transfer import Transfer
from verification_util import Verification

# The reward we give to miners (for creating a new block)
MINING_REWARD = 10

blockchain = []
open_transfers = []

admin = 'DT'


def load_data():
    """Initialize blockchain + open transfers data from a file"""
    global blockchain
    global open_transfers
    try:
        with open('blockchain.txt', mode='r') as f:
            file_content = f.readlines()
            blockchain = json.loads(file_content[0][:-1])
            # OrderedDict
            updated_blockchain = []
            for block in blockchain:
                converted_transfers = [
                    Transfer(tx['user'], tx['amount']) for tx in block['transfers']]
                # converted_transfers = [OrderedDict(
                #     [('user', tx['user']), ('amount', tx['amount'])]) for tx in block['transfers']]
                updated_block = Block(
                    block['index'], block['previous_hash'], converted_transfers, block['proof'], block['timestamp'])
                updated_blockchain.append(updated_block)
            blockchain = updated_blockchain
            open_transfers = json.loads(file_content[1])
            # OrderedDict
            updated_transfers = []
            for tx in open_transfers:
                updated_transfer = Transfer(tx['user'], tx['amount'])
                # updated_transfer = OrderedDict(
                #     [('user', tx['user']), ('amount', tx['amount'])])
                updated_transfers.append(updated_transfer)
            open_transfers = updated_transfers

    except (IOError, IndexError):
        print('File not found!')
        # Our starting block for the blockchain
        genesis_block = Block(0, '', [], 100, 0)
        # Initializing our (empty) blockchain list
        blockchain = [genesis_block]
        # Unhandled transactions
        open_transfers = []


load_data()


def save_data():
    """Save blockchain + open transactions snapshot to a file"""
    try:
        with open('blockchain.txt', mode='w') as f:
            dict_chain = []
            for block in blockchain:
                temp = Block(block.index, block.previous_hash, [
                             tx.__dict__ for tx in block.transfers], block.proof, block.timestamp)
                dict_chain.append(temp.__dict__)
            f.write(json.dumps(dict_chain))
            f.write('\n')
            dict_open_transfers = [tx.__dict__ for tx in open_transfers]
            f.write(json.dumps(dict_open_transfers))
    except IOError:
        print('Saving Data failed!')


def proof_of_work():
    """Generate a proof of work for the open transfers, the hash of the previous block and a random number (which is guessed until it fits)."""
    last_block = blockchain[-1]
    last_hash = hash_block(last_block)
    proof = 0
    v = Verification()
    # Try different PoW numbers and return the first valid one
    while not v.valid_proof(open_transfers, last_hash, proof):
        proof += 1
    print(proof)
    return proof


def get_balance(user):  # done
    """Calculate and return the balance for a user.

    Arguments:
        :user: The user for whom to calculate the balance.
    """
    tx_involving_user = [[tx.amount for tx in block.transfers
                         if tx.user == user] for block in blockchain]
    # open_tx_sender = [tx.amount
    #                   for tx in open_transfers if tx.user== user]
    # tx_sender.append(open_tx_sender)
    # print(tx_sender)
    total_amount = reduce(lambda tx_sum, tx_amt: tx_sum + sum(tx_amt)
                          if len(tx_amt) > 0 else tx_sum + 0, tx_involving_user, 0)
    # Return the total balance
    return total_amount


def get_last_blockchain_value():
    """ Returns the last value of the current blockchain. """
    if len(blockchain) < 1:
        return None
    return blockchain[-1]


def credit_points(user, amount=0.0):
    """Credit points to user. No checks required"""
    transfer = Transfer(user, amount)
    # transfer = OrderedDict(
    #     [('user', user), ('amount', amount)])
    open_transfers.append(transfer)
    # participants.add(user)
    save_data()
    return True


def debit_points(user, amount=0.0):
    """Debit points from user. Need to verify sufficient points."""
    amount *= -1
    transfer = Transfer(user, amount)
    v = Verification()
    # transfer = OrderedDict(
    #     [('user', user), ('amount', amount)])
    if v.verify_sufficient_points(transfer, get_balance):
        open_transfers.append(transfer)
        # participants.add(user)
        save_data()
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
#         open_transfers.append(transaction)
#         participants.add(sender)
#         participants.add(recipient)
#         return True
#     return False


def mine_block():  # done
    """Create a new block and add open transfers to it."""
    # Fetch the currently last block of the blockchain
    last_block = blockchain[-1]
    print(last_block)
    # Hash the last block (to be able to compare it to the stored hash value)
    hashed_block = hash_block(last_block)
    proof = proof_of_work()
    # Miners should be rewarded, so let's create a reward transaction
    reward_transaction = Transfer(admin, MINING_REWARD)
    # Copy transaction instead of manipulating the original open_transactions list
    # This ensures that if for some reason the mining should fail, we don't have the reward transaction stored in the open transactions
    copied_transactions = open_transfers[:]
    copied_transactions.append(reward_transaction)
    block = Block(len(blockchain), hashed_block, copied_transactions, proof)
    blockchain.append(block)
    return True


def get_transfer_data():  # done
    recipient = input('Enter the recipient of the Loyalty Points: ')
    amount = float(input('How many points? : '))
    return recipient, amount


def get_change_data():  # done
    user = input('Enter the User: ')
    amount = float(input('How many points? : '))
    return user, amount


def get_user_choice():  # done
    user_input = input('Your choice: ')
    return user_input


def print_blockchain_elements():  # done
    """ Output all blocks of the blockchain. """
    # Output the blockchain list to the console
    for block in blockchain:
        print('Outputting Block')
        print(block)
    else:
        print('-' * 20)


waiting_for_input = True

# user input interface
while waiting_for_input:
    print('Please choose')
    print('1: Transfer Loyalty Points')
    print('2: Mine a new block')
    print('3: Output the blockchain blocks')
    print('4: Check transaction validity')
    print('5: Credit/Debit Loyalty Points')
    print('q: Quit')
    user_choice = get_user_choice()
    if user_choice == '1':
        tx_data = get_transfer_data()
        recipient, amount = tx_data
        if debit_points(admin, amount):
            credit_points(recipient, amount)
            print('Added transaction!')
        else:
            print('Transaction failed! Insufficient Points')
        print(open_transfers)
    elif user_choice == '5':
        data = get_change_data()
        user, amount = data
        if amount < 0:
            if debit_points(user, amount*-1):
                print('Points Debited!')
            else:
                print('Debit failed! Insufficient Points')
        else:
            credit_points(user, amount)
            print('Points Credited!')
    elif user_choice == '2':
        if mine_block():
            open_transfers = []
            save_data()
    elif user_choice == '3':
        print_blockchain_elements()
    elif user_choice == '4':
        v = Verification()
        if v.verify_transactions(open_transfers, get_balance):
            print('All transactions are valid')
        else:
            print('There are invalid transactions')
    elif user_choice == 'q':
        # This will lead to the loop to exist because it's running condition becomes False
        waiting_for_input = False
    else:
        print('Input was invalid, please pick a value from the list!')
    v = Verification()
    if not v.verify_chain(blockchain):
        print_blockchain_elements()
        print('Invalid blockchain!')
        # Break out of the loop
        break
    print('Balance of {}: {:6.2f}'.format(admin, get_balance(admin)))
else:
    print('User left!')


print('Done!')
