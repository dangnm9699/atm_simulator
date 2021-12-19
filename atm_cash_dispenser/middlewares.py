import os
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

import jwt
import time

oauth2 = HTTPBearer(scheme_name=os.getenv("SCHEME_NAME"))


def validate_token(credentials=Depends(oauth2)) -> str:
    try:
        payload = jwt.decode(
            credentials.credentials,
            os.getenv("SECRET_KEY"),
            algorithms=[os.getenv("ALGORITHM")],
        )
        if payload.get("exp") < time.time():
            raise HTTPException(status_code=401, detail="Token expired")
        return payload.get("name")
    except jwt.PyJWTError:
        raise HTTPException(status_code=403, detail="Forbiden")
