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
    
### Card
* Kiểm tra số dư
```
 get: /v1/api/card/primaryAccount
```
* Đổi mã PIN
```
 post: /v1/api/card/changePin
```
* Rút tiền mặt
```
 post: /v1/api/card/withdraw
```
* Tình trạng hoạt động của thẻ
```
 put: /v1/api/card/activate
```
### Transactions
* Biên lai giao dịch
```
 get: /v1/api/transactions/information
```


