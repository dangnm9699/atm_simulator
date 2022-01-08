# atm_simulator
InInformation Systems Design Project / SoICT / HUST / 20211

## Frameworks and Libraries
* Spring Boot
* MySQL
* JWT
* Lombok

# API Documentation
## Authenication 

* Đăng nhập
```
 post: /v1/api/auth/sigin
```
### User
* Đổi mã PIN
```
 post: /v1/api/user/{id}/changePin
```

### Card
* Kiểm tra số dư
```
 get: /v1/api/card/{id}/primaryAccount
```

* Nạp tiền vào thẻ
```
 post: /v1/api/card/deposit
```

* Tình trạng hoạt động của thẻ
```
 put: /v1/api/card/{id}/activate
```
### Transactions
* Biên lai giao dịch
```
 get: /v1/api/transactions/information
```
* Rút tiền mặt
```
 post: /v1/api/transactions/withdraw
```


