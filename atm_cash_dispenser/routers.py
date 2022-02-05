from datetime import datetime
from typing import Optional
import json
import os
from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
import urllib.request
import database
import middlewares
from repositories import system
import helpers
import schemas

router = APIRouter(prefix="/api/v1")


@router.get("/health")
async def health_check():
    return {"message": "OK"}


@router.post(
    "/withdraw",
    dependencies=[Depends(middlewares.validate_token)],
    response_model=schemas.WithdrawalResponse,
)
async def widthdrawal(
    request: schemas.WithdrawalRequest, authorization: Optional[str] = Header(None), db: Session = Depends(database.get)
):
    # Check available cash
    available_cash = system.get(db)
    if len(available_cash) == 0:
        return {"status": 500, "message": "Some errors occured", "payload": None}
    available_cash = available_cash[0]
    # If requested amount is greater than available
    if (request.amount) > available_cash.total:
        return {
            "status": 400,
            "message": "The ATM cannot accommodate the amount you requested",
            "payload": None,
        }
    # Calculate cashes to return
    limits = {
        500000: available_cash.n_500,
        200000: available_cash.n_200,
        100000: available_cash.n_100,
        50000: available_cash.n_50,
        20000: available_cash.n_20,
        10000: available_cash.n_10,
    }
    cashes = helpers.check_withdrawal(amount=request.amount, limits=limits)
    item = schemas.Transaction(amount=request.amount, card=request.card)
    ok = False
    for key in cashes.keys():
        if key == 500000:
            item.n_500 = cashes[key]
            ok = True
        if key == 200000:
            item.n_200 = cashes[key]
            ok = True
        if key == 100000:
            item.n_100 = cashes[key]
            ok = True
        if key == 50000:
            item.n_50 = cashes[key]
            ok = True
        if key == 20000:
            item.n_20 = cashes[key]
            ok = True
        if key == 10000:
            item.n_10 = cashes[key]
            ok = True
    if ok:
        # call bank service
        json_data_bytes = json.dumps({
            "number": request.card,
            "ip": "172.92.16.42",
            "money": str(request.amount)
        }).encode("utf-8")
        req = urllib.request.Request(
            url=os.getenv("BANK_API") + "/transaction/withdraw",
            method="POST")
        req.add_header("Content-Type", "application/json")
        req.add_header("Content-Length", len(json_data_bytes))
        req.add_header("Authorization", authorization)
        res = urllib.request.urlopen(req, json_data_bytes)
        resJson = json.loads(res.read())
        # execute transaction at atm
        udpated_item = system.update(db=db, transaction=item)
        item.created_at = datetime.fromisoformat(resJson["created_at"])
        return {"status": 200, "message": "OK", "payload": item}
    else:
        return {
            "status": 400,
            "message": "The ATM cannot accommodate the amount you requested",
            "payload": None,
        }


@router.post(
    "/receipt",
    dependencies=[Depends(middlewares.validate_token)],
    response_model=schemas.ReceiptResponse,
)
async def receipt(
    request: schemas.ReceiptRequest
):
    RECEIPT_URL = os.getenv("RECEIPT_APP")
    query = urllib.parse.urlencode(query={
        "receipt_type": request.receipt_type,
        "amount": request.amount,
        "atm_ip": request.atm_ip,
        "created_at": request.created_at,
        "card": request.src_card,
        "src_card": request.src_card,
        "dst_card": request.dst_card
    })
    RECEIPT_URL = RECEIPT_URL + f"?{query}"
    print(RECEIPT_URL)
    response = urllib.request.urlopen(RECEIPT_URL)
    data = json.loads(response.read())
    return {
        "receipt_link": data["download_link"]
    }
