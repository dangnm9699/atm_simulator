import re
from typing import Dict, List

g_limits = {}


def check_withdrawal(amount: int, limits: Dict[int, int]):
    global g_limits
    g_limits = limits
    sorted_nominals = list(g_limits.keys())
    sorted_nominals.sort(reverse=True)
    return _recur(amount, sorted_nominals)


def _recur(amount: int, nominals: List[int]):
    if amount == 0:
        return {}
    if len(nominals) == 0:
        return
    nominal = nominals[0]
    count = min(g_limits[nominal], amount // nominal)
    for i in range(count, -1, -1):
        result = _recur(amount - i * nominal, nominals[1:])
        if result != None:
            if i == 0:
                return result
            result[nominal] = i
            return result
