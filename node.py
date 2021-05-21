from os import putenv, stat
from Crypto import PublicKey
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.wrappers import response

from blockchain import Blockchain
from wallet import Wallet

app = Flask(__name__)
wallet = Wallet()
blockchain = Blockchain(wallet.public_key)
CORS(app)


@app.route("/", methods=["GET"])
def get_ui():
    return "Running"


@app.route("/wallet", methods=["POST"])
def create_keys():
    wallet.create_keys()
    if wallet.save_keys():
        global blockchain
        blockchain = Blockchain(wallet.public_key)
        response = {
            "public_key": wallet.public_key,
            "private_key": wallet.private_key,
            "balance": blockchain.get_balance(),
        }
        return jsonify(response), 201
    else:
        response = {"message": "Saving keys failed"}
        return jsonify(response), 500


@app.route("/wallet", methods=["GET"])
def load_keys():
    if wallet.load_keys():
        global blockchain
        blockchain = Blockchain(wallet.public_key)
        response = {
            "public_key": wallet.public_key,
            "private_key": wallet.private_key,
            "balance": blockchain.get_balance(),
        }
        return jsonify(response), 201
    else:
        response = {"message": "Loading keys failed"}
        return jsonify(response), 500


@app.route("/balance", methods=["GET"])
def get_balance():
    balance = blockchain.get_balance()
    if balance != None:
        response = {"message": "Fetched Balance Successfully", "balance": balance}
        return jsonify(response), 200
    else:
        response = {
            "message": "Fetching Balance Failed",
            "wallet_set_up": wallet.public_key != None,
        }
        return jsonify(response), 500


# check for negative amount in transfer
@app.route("/points/transfer", methods=["POST"])
def transfer_points():
    if wallet.public_key == None:
        response = {"message": "No wallet set up"}
        return jsonify(response), 400
    data = request.get_json()
    if not data:
        response = {"message": "Data not found!"}
        return jsonify(response), 400
    required_fields = ["recipient", "amount"]
    if not all(field in data for field in required_fields):
        response = {"message": "Required data not found!"}
        return jsonify(response), 400
    recipient = data["recipient"]
    amount = data["amount"]
    signature_debit = wallet.transfer_signature(wallet.public_key, amount * -1)
    signature_credit = wallet.transfer_signature(recipient, amount)

    if blockchain.debit_points(wallet.public_key, signature_debit, amount * -1):
        blockchain.credit_points(recipient, signature_credit, amount)
        response = {
            "message": "Transfer Points Successful!",
            "entry": {
                "sender": wallet.public_key,
                "recipient": recipient,
                "amount": amount,
                "signature_credit": signature_credit,
                "signature_debit": signature_debit,
            },
        }
        return jsonify(response), 201
    else:
        response = {"message": "Transaction failed!"}
        return jsonify(response), 500


@app.route("/points/entry", methods=["POST"])
def credit_debit_points():
    if wallet.public_key == None:
        response = {"message": "No wallet set up"}
        return jsonify(response), 400
    data = request.get_json()
    if not data:
        response = {"message": "Data not found!"}
        return jsonify(response), 400
    required_fields = ["user", "amount"]
    if not all(field in data for field in required_fields):
        response = {"message": "Required data not found!"}
        return jsonify(response), 400
    user = data["user"]
    amount = data["amount"]
    signature = wallet.transfer_signature(user, amount)
    response = {"message": "Unknown error!", "entry": ""}
    status = 500
    if amount < 0:
        if blockchain.debit_points(user, signature, amount):
            response["message"] = "Points Debited!"
            response["entry"] = {"user": user, "amount": amount, "signature": signature}
            status = 201
        else:
            response["message"] = "Debit Failed!"
            status = 500
    else:
        if blockchain.credit_points(user, signature, amount):
            response["message"] = "Points Credited!"
            response["entry"] = {"user": user, "amount": amount, "signature": signature}
            status = 201
        else:
            response["message"] = "Debit Failed!"
            status = 500
    return jsonify(response), status


@app.route("/points/open", methods=["GET"])
def get_open_transfers():
    transfers = blockchain.get_open_transfers()
    transfers_dict = [tx.__dict__ for tx in transfers]
    return jsonify(transfers_dict), 200


@app.route("/mine", methods=["POST"])
def mine():
    block = blockchain.mine_block()
    if block != None:
        block_dict = block.__dict__.copy()
        block_dict["transfers"] = [tx.__dict__ for tx in block_dict["transfers"]]
        response = {
            "message": "Block mined successfully",
            "block": block_dict,
            "balance": blockchain.get_balance(),
        }
        return response, 200
    else:
        response = {
            "message": "Mining Failed",
            "wallet_set_up": wallet.public_key != None,
        }
        return jsonify(response), 500


@app.route("/chain", methods=["GET"])
def get_chain():
    chain_snap = blockchain.get_chain()
    chain_snap_dict = [block.__dict__.copy() for block in chain_snap]
    for block_dict in chain_snap_dict:
        block_dict["transfers"] = [tx.__dict__ for tx in block_dict["transfers"]]
    return jsonify(chain_snap_dict), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
