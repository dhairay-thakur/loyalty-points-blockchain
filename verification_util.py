from hash_util import hash_block, hash_string_256


class Verification:
    @staticmethod
    def valid_proof(transfers, last_hash, proof):
        # Create a string with all the hash inputs
        guess = (str([tx.to_ordered_dict() for tx in transfers]) +
                 str(last_hash) + str(proof)).encode()
        # Hash the string
        # IMPORTANT: This is NOT the same hash as will be stored in the previous_hash. It's a not a block's hash. It's only used for the proof-of-work algorithm.
        guess_hash = hash_string_256(guess)
        # print(guess_hash)
        # Only a hash (which is based on the above inputs) which starts with two 0s is treated as valid
        return guess_hash[0:2] == '00'

    @classmethod
    def verify_chain(cls, blockchain):
        """ Verify the current blockchain and return True if it's valid, False otherwise."""
        for (index, block) in enumerate(blockchain):
            if index == 0:
                continue
            if block.previous_hash != hash_block(blockchain[index - 1]):
                return False
            if not cls.valid_proof(block.transfers[:-1], block.previous_hash, block.proof):
                print('Proof of work is invalid')
                return False
        return True

    @staticmethod
    def verify_sufficient_points(transaction, get_balance):  # done
        """Verify a transfer by checking whether the user has sufficient points

        Arguments:
            :transaction: The transaction that should be verified.
        """
        user_balance = get_balance()
        # print('user-balance = ', user_balance)
        return user_balance + transaction.amount >= 0

    @classmethod
    def verify_transactions(cls, open_transfers, get_balance):
        """Verifies all open transactions."""
        return all([cls.verify_sufficient_points(tx, get_balance) for tx in open_transfers])
