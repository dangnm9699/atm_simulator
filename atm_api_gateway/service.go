package main

import (
	"log"
	"net/url"
	"os"
)

type Service struct {
	name   string
	host   string
	prefix string
}

func CreateAtmCashDispenserSvc() *Service {
	log.Println("Creating service with host =", os.Getenv("ATM_CASH_DISPENSER_URL"))
	return &Service{
		name:   "ATM CASH DISPENSER",
		host:   os.Getenv("ATM_CASH_DISPENSER_URL"),
		prefix: "/acd/",
	}
}

func CreateAtmCardReaderSvc() *Service {
	return &Service{
		name:   "ATM CARD READER",
		host:   os.Getenv("ATM_CARD_READER_URL"),
		prefix: "/acr/",
	}
}

func (svc *Service) Name() string {
	return svc.name
}

func (svc *Service) Parse() (*url.URL, error) {
	return url.Parse(svc.host)
}
