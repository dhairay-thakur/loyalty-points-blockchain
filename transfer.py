from collections import OrderedDict
from output_format import OutputFormat


class Transfer(OutputFormat):
    def __init__(self, user, amount):
        self.user = user
        self.amount = amount

    def to_ordered_dict(self):
        return OrderedDict([('user', self.user), ('amount', self.amount)])
