from uuid import uuid4

from Crypto import Signature

from blockchain import Blockchain
from util.verification_util import Verification
from wallet import Wallet


class Node:
    def __init__(self):
        # self.wallet.public_key = str(uuid4())
        self.wallet = Wallet()
        self.wallet.create_keys()
        self.blockchain = Blockchain(self.wallet.public_key)

    def get_transfer_data(self):
        recipient = input("Enter the recipient of the Loyalty Points: ")
        amount = float(input("How many points? : "))
        return recipient, amount

    def get_change_data(self):
        user = input("Enter the User: ")
        amount = float(input("How many points? : "))
        return user, amount

    def get_user_choice(self):
        user_input = input("Your choice: ")
        return user_input

    def print_blockchain_elements(self):
        """Output all blocks of the blockchain."""
        # Output the blockchain list to the console
        for block in self.blockchain.get_chain():
            print("Outputting Block")
            print(block)
        else:
            print("-" * 20)

    def listen(self):
        waiting_for_input = True
        while waiting_for_input:
            print("Please choose")
            print("1: Transfer Loyalty Points")
            print("2: Mine a new block")
            print("3: Output the blockchain blocks")
            print("4: Check transaction validity")
            print("5: Credit/Debit Loyalty Points")
            print("6: Create Wallet")
            print("7: Load Wallet")
            print("8: Save Keys")
            print("q: Quit")
            user_choice = self.get_user_choice()
            if user_choice == "1":
                tx_data = self.get_transfer_data()
                recipient, amount = tx_data
                signature_debit = self.wallet.transfer_signature(
                    self.wallet.public_key, amount * -1
                )
                signature_credit = self.wallet.transfer_signature(recipient, amount)

                if self.blockchain.debit_points(
                    self.wallet.public_key, signature_debit, amount * -1
                ):
                    self.blockchain.credit_points(recipient, signature_credit, amount)
                    print("Added transaction!")
                else:
                    print("Transaction failed!")
                print(self.blockchain.get_open_transfers())
            elif user_choice == "5":
                data = self.get_change_data()
                user, amount = data
                signature = self.wallet.transfer_signature(user, amount)
                if amount < 0:
                    if self.blockchain.debit_points(user, signature, amount):
                        print("Points Debited!")
                    else:
                        print("Debit failed!")
                else:
                    if self.blockchain.credit_points(user, signature, amount):
                        print("Points Credited!")
                    else:
                        print("Credit failed!")
            elif user_choice == "2":
                if not self.blockchain.mine_block():
                    print("Mining Failed. No wallet found.")
            elif user_choice == "3":
                self.print_blockchain_elements()
            elif user_choice == "4":
                if Verification.verify_transactions(
                    self.blockchain.get_open_transfers(), self.blockchain.get_balance
                ):
                    print("All transactions are valid")
                else:
                    print("There are invalid transactions")
            elif user_choice == "6":
                self.wallet.create_keys()
                self.blockchain = Blockchain(self.wallet.public_key)
            elif user_choice == "7":
                self.wallet.load_keys()
                self.blockchain = Blockchain(self.wallet.public_key)
            elif user_choice == "8":
                self.wallet.save_keys()
            elif user_choice == "q":
                # This will lead to the loop to exist because it's running condition becomes False
                waiting_for_input = False
            else:
                print("Input was invalid, please pick a value from the list!")
            if not Verification.verify_chain(self.blockchain.get_chain()):
                self.print_blockchain_elements()
                print("Invalid blockchain!")
                # Break out of the loop
                break
            print(
                "Balance of {}: {:6.2f}".format(
                    self.wallet.public_key, self.blockchain.get_balance()
                )
            )
        else:
            print("User left!")

        print("Done!")


node = Node()
node.listen()
