FROM maven:3.8.3-openjdk-17

WORKDIR /atm_bank

COPY target/atm_bank-0.0.1-SNAPSHOT.jar atm_bank-0.0.1-SNAPSHOT.jar

EXPOSE 3003

ENTRYPOINT ["java","-jar","atm_bank-0.0.1-SNAPSHOT.jar"]