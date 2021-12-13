from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import database

from repositories import system, change

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/current")
async def current(db: Session = Depends(database.get)):
    db_system = system.get(db)
    if len(db_system) == 0:
        raise HTTPException(status_code=404, detail="Cannot get current")
    return db_system
