from collections import OrderedDict
from util.output_format import OutputFormat


class Transfer(OutputFormat):
    def __init__(self, user, signature, amount):
        self.user = user
        self.signature = signature
        self.amount = amount

    def to_ordered_dict(self):
        return OrderedDict([("user", self.user), ("amount", self.amount)])
