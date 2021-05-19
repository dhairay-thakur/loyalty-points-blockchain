import hashlib as hl
import json


def hash_string_256(string):
    """Create a SHA256 hash for a given input string.

    Arguments:
        :string: The string which should be hashed.
    """
    return hl.sha256(string).hexdigest()


def hash_block(block):
    """Hashes a block and returns a string representation of it.

    Arguments:
        :block: The block that should be hashed.
    """
    dict_block = block.__dict__.copy()
    dict_block['transfers'] = [tx.to_ordered_dict()
                               for tx in dict_block['transfers']]
    return hash_string_256(json.dumps(dict_block, sort_keys=True).encode())
