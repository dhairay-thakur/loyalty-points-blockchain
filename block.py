from time import time
from output_format import OutputFormat


class Block(OutputFormat):
    def __init__(self, index, previous_hash, transfers, proof, timestamp=None):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = self.timestamp = time() if timestamp is None else timestamp
        self.transfers = transfers
        self.proof = proof
