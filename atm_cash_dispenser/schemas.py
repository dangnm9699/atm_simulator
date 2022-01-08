from typing import List, Text, Optional
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


class Change(BaseModel):
    id: int
    amount: int
    before: int
    current: int
    n_500: Optional[int] = 0
    n_200: Optional[int] = 0
    n_100: Optional[int] = 0
    n_50: Optional[int] = 0
    n_20: Optional[int] = 0
    n_10: Optional[int] = 0
    changed_by: Optional[Text] = "admin"
    changed_at: datetime


class WithdrawalRequest(BaseModel):
    card_id: int
    amount: int


class WithdrawalPayload(BaseModel):
    amount: int
    n_500: Optional[int] = 0
    n_200: Optional[int] = 0
    n_100: Optional[int] = 0
    n_50: Optional[int] = 0
    n_20: Optional[int] = 0
    n_10: Optional[int] = 0


class WithdrawalResponse(BaseModel):
    status: int
    message: str
    payload: WithdrawalPayload
