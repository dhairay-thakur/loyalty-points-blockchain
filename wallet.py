import binascii
from typing import IO
from Crypto import PublicKey

import Crypto.Random
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256


class Wallet:
    def __init__(self):
        self.private_key = None
        self.public_key = None

    def create_keys(self):
        private_key, public_key = self.generate_keys()
        self.private_key = private_key
        self.public_key = public_key

    def save_keys(self):
        if self.public_key != None and self.private_key != None:
            try:
                with open("wallet.txt", "w") as f:
                    f.write("Public Key : ")
                    f.write(self.public_key)
                    f.write("\n")
                    f.write("PrivateKey : ")
                    f.write(self.private_key)
                return True
            except (IOError, IndexError):
                print("Creating Wallet failed!")
                return False

    def load_keys(self):
        try:
            with open("wallet.txt", "r") as f:
                keys = f.readlines()
                self.public_key = keys[0][13:-1]
                self.private_key = keys[1][13:]
            return True
        except (IOError, IndexError):
            print("Loading Wallet failed!")
            return False

    def transform_key(self, key):
        return binascii.hexlify(key.export_key(format="DER")).decode("ascii")

    def generate_keys(self):
        private_key = RSA.generate(1024, Crypto.Random.new().read)
        public_key = private_key.public_key()
        return (self.transform_key(private_key), self.transform_key(public_key))

    def transfer_signature(self, user, amount):
        signer = PKCS1_v1_5.new(RSA.importKey(binascii.unhexlify(self.private_key)))
        h = SHA256.new((str(user) + str(amount)).encode("utf8"))
        signature = signer.sign(h)
        return binascii.hexlify(signature).decode("ascii")

    @staticmethod
    def verify_transfer(transfer):
        # public_key = RSA.importKey(binascii.unhexlify(transfer.user))
        # verifier = PKCS1_v1_5.new(public_key)
        # h = SHA256.new((str(transfer.user) + str(transfer.amount)).encode("utf8"))
        # return verifier.verify(h, binascii.unhexlify(transfer.signature))
        return True
