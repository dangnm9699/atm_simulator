from routers import router
import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from dotenv import load_dotenv
import uvicorn

load_dotenv()


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="ATM Cash Dispenser",
        version="1.0.0",
        description="ATM Cash Dispenser module in an ATM, developed with FastAPI",
        routes=app.routes,
    )

    # look for the error 422 and removes it
    for method in openapi_schema["paths"]:
        try:
            del openapi_schema["paths"][method]["post"]["responses"]["422"]
        except KeyError:
            pass

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app = FastAPI(
    title="ATM Cash Dispenser",
    openapi_url="/openapi.json",
    docs_url="/documentation",
    description="ATM Cash Dispenser module in an ATM, developed with FastAPI",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

app.openapi = custom_openapi

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT")))
