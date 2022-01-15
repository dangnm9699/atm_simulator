FROM golang:1.17-alpine

WORKDIR /atm_api_gateway

COPY . .

RUN go mod tidy

RUN go build -o atm_api_gateway

EXPOSE 8080

CMD ["./atm_api_gateway"]
