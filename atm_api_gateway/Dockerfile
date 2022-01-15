FROM golang:1.17-alpine

ENV ATM_CARD_READER_URL=http://localhost:3001
ENV ATM_CASH_DISPENSER_URL=http://localhost:3002
ENV ATM_BANK_URL=http://localhost:3003
ENV PORT=:8080

WORKDIR /atm_api_gateway

COPY . .

RUN go mod tidy

RUN go build -o atm_api_gateway

EXPOSE 8080

CMD ["./atm_api_gateway"]
