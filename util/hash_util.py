import hashlib as hl
import json


def hash_string_256(string):
    return hl.sha256(string).hexdigest()


def hash_block(block):
    dict_block = block.__dict__.copy()
    dict_block['transfers'] = [tx.to_ordered_dict()
                               for tx in dict_block['transfers']]
    return hash_string_256(json.dumps(dict_block, sort_keys=True).encode())
