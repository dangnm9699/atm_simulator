# ATM Bank

**Prerequisite**

- JDK 17
- MySQL
- Maven

## How to run

- Create file `src/main/resources/application.properties` and edit if necessary

```
app.jwtSecret=information-systems-design-project-it5005-soict-hust-20211
app.jwtExpirationInMs=604800000
server.port=3003
server.servlet.context-path=/api/v1
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect
spring.jpa.hibernate.ddl-auto=create
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/atm_bank?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

- Run MySQL
- Build app

```bash
./mvnw package
```

- Run app

```bash
java -jar target/atm_bank-0.0.1-SNAPSHOT.jar
```

## API Definition

- Open browser
- Access `http://localhost:3003/api/v1/swagger-ui.html`
