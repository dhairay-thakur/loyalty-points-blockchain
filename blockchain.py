import hashlib as hl
from collections import OrderedDict
from functools import reduce

from hash_util import hash_block, hash_string_256

# The reward we give to miners (for creating a new block)
MINING_REWARD = 10

# Our starting block for the blockchain
genesis_block = {
    'previous_hash': '',
    'index': 0,
    'transfers': [],
    'proof': 100
}
# Initializing our (empty) blockchain list
blockchain = [genesis_block]
# Unhandled transactions
open_transfers = []

admin = 'DT'
# Registered participants: Ourself + other people sending/ receiving coins
participants = {'DT'}


def valid_proof(transactions, last_hash, proof):
    """Validate a proof of work number and see if it solves the puzzle algorithm (two leading 0s)

    Arguments:
        :transactions: The transactions of the block for which the proof is created.
        :last_hash: The previous block's hash which will be stored in the current block.
        :proof: The proof number we're testing.
    """
    # Create a string with all the hash inputs
    guess = (str(transactions) + str(last_hash) + str(proof)).encode()
    # Hash the string
    # IMPORTANT: This is NOT the same hash as will be stored in the previous_hash. It's a not a block's hash. It's only used for the proof-of-work algorithm.
    guess_hash = hash_string_256(guess)
    # print(guess_hash)
    # Only a hash (which is based on the above inputs) which starts with two 0s is treated as valid
    return guess_hash[0:2] == '00'


def proof_of_work():
    """Generate a proof of work for the open transfers, the hash of the previous block and a random number (which is guessed until it fits)."""
    last_block = blockchain[-1]
    last_hash = hash_block(last_block)
    proof = 0
    # Try different PoW numbers and return the first valid one
    while not valid_proof(open_transfers, last_hash, proof):
        proof += 1
    return proof


def get_balance(user):  # done
    """Calculate and return the balance for a user.

    Arguments:
        :user: The user for whom to calculate the balance.
    """
    tx_sender = [[tx['amount'] for tx in block['transfers']
                  if tx['user'] == user] for block in blockchain]
    # open_tx_sender = [tx['amount']
    #                   for tx in open_transfers if tx['user'] == user]
    # tx_sender.append(open_tx_sender)
    # print(tx_sender)
    amount_sent = reduce(lambda tx_sum, tx_amt: tx_sum + sum(tx_amt)
                         if len(tx_amt) > 0 else tx_sum + 0, tx_sender, 0)
    # tx_recipient = [[tx['amount'] for tx in block['transfers']
    #                  if tx['user'] == user] for block in blockchain]
    # amount_received = reduce(lambda tx_sum, tx_amt: tx_sum + sum(tx_amt)
    #                          if len(tx_amt) > 0 else tx_sum + 0, tx_recipient, 0)
    # Return the total balance
    return amount_sent


def get_last_blockchain_value():
    """ Returns the last value of the current blockchain. """
    if len(blockchain) < 1:
        return None
    return blockchain[-1]


def verify_sufficient_points(transaction):  # done
    """Verify a transfer by checking whether the user has sufficient points

    Arguments:
        :transaction: The transaction that should be verified.
    """
    user_balance = get_balance(transaction['user'])
    # print('user-balance = ', user_balance)
    return user_balance + transaction['amount'] >= 0


def credit_points(user, amount=0.0):
    """Credit points to user. No checks required"""
    transfer = OrderedDict(
        [('user', user), ('amount', amount)])
    open_transfers.append(transfer)
    participants.add(user)
    return True


def debit_points(user, amount=0.0):
    """Debit points from user. Need to verify sufficient points."""
    amount *= -1
    transfer = OrderedDict(
        [('user', user), ('amount', amount)])
    if verify_sufficient_points(transfer):
        open_transfers.append(transfer)
        participants.add(user)
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
    # Hash the last block (=> to be able to compare it to the stored hash value)
    hashed_block = hash_block(last_block)
    proof = proof_of_work()
    # Miners should be rewarded, so let's create a reward transaction
    reward_transaction = OrderedDict(
        [('user', admin), ('amount', MINING_REWARD)])
    # Copy transaction instead of manipulating the original open_transactions list
    # This ensures that if for some reason the mining should fail, we don't have the reward transaction stored in the open transactions
    copied_transactions = open_transfers[:]
    copied_transactions.append(reward_transaction)
    block = {
        'previous_hash': hashed_block,
        'index': len(blockchain),
        'transfers': copied_transactions,
        'proof': proof
    }
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


def verify_chain():
    """ Verify the current blockchain and return True if it's valid, False otherwise."""
    for (index, block) in enumerate(blockchain):
        if index == 0:
            continue
        if block['previous_hash'] != hash_block(blockchain[index - 1]):
            return False
        if not valid_proof(block['transfers'][:-1], block['previous_hash'], block['proof']):
            print('Proof of work is invalid')
            return False
    return True


def verify_transactions():
    """Verifies all open transactions."""
    return all([verify_sufficient_points(tx) for tx in open_transfers])


waiting_for_input = True

# user input interface
while waiting_for_input:
    print('Please choose')
    print('1: Transfer Loyalty Points')
    print('2: Mine a new block')
    print('3: Output the blockchain blocks')
    print('4: Output participants')
    print('5: Check transaction validity')
    print('6: Credit/Debit Loyalty Points')
    print('h: Manipulate the chain')
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
    elif user_choice == '6':
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
    elif user_choice == '3':
        print_blockchain_elements()
    elif user_choice == '4':
        print(participants)
    elif user_choice == '5':
        if verify_transactions():
            print('All transactions are valid')
        else:
            print('There are invalid transactions')
    elif user_choice == 'h':
        # Make sure that you don't try to "hack" the blockchain if it's empty
        if len(blockchain) >= 1:
            blockchain[0] = {
                'previous_hash': '',
                'index': 0,
                'transactions': [{'sender': 'Chris', 'recipient': 'Max', 'amount': 100.0}]
            }
    elif user_choice == 'q':
        # This will lead to the loop to exist because it's running condition becomes False
        waiting_for_input = False
    else:
        print('Input was invalid, please pick a value from the list!')
    if not verify_chain():
        print_blockchain_elements()
        print('Invalid blockchain!')
        # Break out of the loop
        break
    print('Balance of {}: {:6.2f}'.format(admin, get_balance(admin)))
else:
    print('User left!')


print('Done!')
