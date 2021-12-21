## Endpoint encode: `localhost:8000/api/v1/read_card/encode`
## Endpoint decode (đọc thẻ): `localhost:8000/api/v1/read_card/decode`
## Input để tạo file có sẵn cho user:
```
{
    "cardNumber": "17505129757329075324003",
    "name": "PHAM VAN CHUNG",
    "gender": "male",
    "citizenId": "164645774"
}
```
## Input để decode (nội dung trong file)

```
input:
{
    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImNhcmROdW1iZXIiOiIxNzUwNTEyOTc1NzMyOTA3NTMyNDAwMyIsIm5hbWUiOiJQSEFNIFZBTiBDSFVORyIsImdlbmRlciI6Im1hbGUiLCJjaXRpemVuSWQiOiIxNjQ2NDU3NzQifSwiaWF0IjoxNjQwMDk0MDE3LCJleHAiOjQ3OTU4NTQwMTd9.9f6x7wjIYYs5dbRyDm_cwiWYFknjGgyeYbzkpV_hnc21mv_HDrKpfEHBv9JlphdciW5pdrZ27OrUdm-SNCFyIA"
}
```

Chạy:
```
> Tạo 1 file .env tương tự file .env.example (tùy chỉnh port)
> sudo npm install
> npm init
```
