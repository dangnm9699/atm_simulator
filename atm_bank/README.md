# atm_bank
InInformation Systems Design Project / SoICT / HUST / 20211

## Frameworks and Libraries
* Spring Boot
* MySQL
* JWT
* Lombok

## ATM Bank Setup

- Create `src/main/resources/application.properties` with below contents:

```
jwt.secret =  javainuse
server.port = 8080
server.servlet.context-path=/api/v1
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect
spring.jpa.hibernate.ddl-auto=update
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/atm_bank
spring.datasource.username=root
spring.datasource.password= 
```

# API Documentation
```
    get: /api/v1/swagger-ui.html
```
## Authenication