from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import database
import middlewares
from repositories import system, change
import helpers
import schemas

router = APIRouter(prefix="/api/v1")


@router.get("/")
async def root():
    return {"message": "Hello World! This is ATM Cash Dispenser!"}


@router.get("/health")
async def health_check():
    return {"message": "OK"}


@router.post(
    "/withdrawals",
    dependencies=[Depends(middlewares.validate_token)],
    response_model=schemas.WithdrawalResponse,
)
async def widthdrawal(
    request: schemas.WithdrawalRequest, db: Session = Depends(database.get)
):

    # Check available cash
    request_dict = request.dict()
    available_cash = system.get(db)
    if len(available_cash) == 0:
        return {"status": 500, "message": "Some errors occured", "payload": None}
    available_cash = available_cash[0]
    # If requested amount is greater than available
    if (request_dict["amount"]) > available_cash.total:
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
    cashes = helpers.check_withdrawal(amount=request_dict["amount"], limits=limits)
    response_cashes = {
        "amount": request_dict["amount"],
    }
    ok = False
    for key in cashes.keys():
        if key == 500000:
            response_cashes["n_500"] = cashes[key]
            ok = True
        if key == 200000:
            response_cashes["n_200"] = cashes[key]
            ok = True
        if key == 100000:
            response_cashes["n_100"] = cashes[key]
            ok = True
        if key == 50000:
            response_cashes["n_50"] = cashes[key]
            ok = True
        if key == 20000:
            response_cashes["n_20"] = cashes[key]
            ok = True
        if key == 10000:
            response_cashes["n_10"] = cashes[key]
            ok = True

    if ok:
        # call bank service

        # apply change to atm database
        pass
    else:
        return {
            "status": 400,
            "message": "The ATM cannot accommodate the amount you requested",
            "payload": None,
        }

    return {"status": 200, "message": "OK", "payload": response_cashes}
