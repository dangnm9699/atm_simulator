from lib2to3.pgen2.token import OP
from typing import Optional
from datetime import datetime

from pydantic import BaseModel


class System(BaseModel):
    id: int
    total: int
    n_500: Optional[int] = 0
    n_200: Optional[int] = 0
    n_100: Optional[int] = 0
    n_50: Optional[int] = 0
    n_20: Optional[int] = 0
    n_10: Optional[int] = 0

    class Config:
        orm_mode = True


class Transaction(BaseModel):
    amount: Optional[int]
    fee: Optional[float]
    card: Optional[str]
    n_500: Optional[int] = 0
    n_200: Optional[int] = 0
    n_100: Optional[int] = 0
    n_50: Optional[int] = 0
    n_20: Optional[int] = 0
    n_10: Optional[int] = 0
    created_at: Optional[datetime]


class WithdrawalRequest(BaseModel):
    card: str
    amount: int


class WithdrawalResponse(BaseModel):
    payload: Transaction


class ReceiptRequest(BaseModel):
    receipt_type: int
    amount: int
    atm_ip: str
    created_at: datetime
    src_card: str
    dst_card: Optional[str]


class ReceiptResponse(BaseModel):
    receipt_link: str


class Message(BaseModel):
    message: str
