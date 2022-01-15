import os
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

import jwt
import time

oauth2 = HTTPBearer(scheme_name=os.getenv("JWT_SCHEME_NAME"))


def validate_token(credentials=Depends(oauth2)) -> str:
    try:
        payload = jwt.decode(
            credentials.credentials,
            os.getenv("JWT_SECRET_KEY"),
            algorithms=[os.getenv("JWT_ALGORITHM")],
        )
        if payload.get("exp") < time.time():
            raise HTTPException(status_code=401, detail="Token expired")
        return payload.get("name")
    except jwt.PyJWTError:
        raise HTTPException(status_code=403, detail="Forbiden")
