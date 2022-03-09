# ATM Card Reader

**Prerequisite**

- NodeJS

## How to run

Execute below commands

```bash
# create .env file, edit if necessary
cp .env.example .env
# install packages
npm i
# start app
npm start
```

## API Description

### 1. Encode (for development/testing)

- Path: `{BASE_URL}/api/v1/read_card/encode`
- Request body:
  ```json
  {
    "cardNumber": "9904220987654321", // required
    "name": "PHAM VAN CHUNG", // required
    "gender": "male",
    "citizenId": "164645774"
  }
  ```
- Response: a encoded string

### 2. Decode

- Path: `{BASE_URL}/api/v1/read_card/decode`
- Request body: an one-line file includes above encoded string \
   Example:
  ```text
  eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImNhcmROdW1iZXIiOiIxNzUwNTEyOTc1NzMyOTA3NTMyNDAwMyIsIm5hbWUiOiJQSEFNIFZBTiBDSFVORyIsImdlbmRlciI6Im1hbGUiLCJjaXRpemVuSWQiOiIxNjQ2NDU3NzQifSwiaWF0IjoxNjQyMTc4Njk3LCJleHAiOjQ3OTc5Mzg2OTd9.a1PkF46x6Qljzug4iaGmMEU8TMykq9FMXrbw9p9gdxEmBo9nDPHY4ykzegiEOZGs__iuzfri8pFqytrSDNHfmA
  ```
- Response:
  ```json
  {
    "cardNumber": "17505129757329075324003",
    "name": "PHAM VAN CHUNG",
    "gender": "male",
    "citizenId": "164645774"
  }
  ```
