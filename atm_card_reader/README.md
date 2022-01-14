## Endpoint encode: `localhost:3001/api/v1/read_card/encode`
## Endpoint decode (đọc thẻ): `localhost:3001/api/v1/read_card/decode`
## Input để tạo file có sẵn cho user:
```
{
    "cardNumber": "17505129757329075324003",
    "name": "PHAM VAN CHUNG",
    "gender": "male",
    "citizenId": "164645774"
}
```
## Input để decode là 1 file (kiểu stream, json hoặc txt. Kích thước <= 1KB), nội dung ví dụ:

```
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImNhcmROdW1iZXIiOiIxNzUwNTEyOTc1NzMyOTA3NTMyNDAwMyIsIm5hbWUiOiJQSEFNIFZBTiBDSFVORyIsImdlbmRlciI6Im1hbGUiLCJjaXRpemVuSWQiOiIxNjQ2NDU3NzQifSwiaWF0IjoxNjQyMTc4Njk3LCJleHAiOjQ3OTc5Mzg2OTd9.a1PkF46x6Qljzug4iaGmMEU8TMykq9FMXrbw9p9gdxEmBo9nDPHY4ykzegiEOZGs__iuzfri8pFqytrSDNHfmA
```

Chạy:
```
> Tạo 1 file .env tương tự file .env.example (tùy chỉnh port, port mặc định là 3001)
> sudo npm install
> npm init
```
