package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"os"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	var services []*Service = []*Service{
		CreateAtmCardReaderSvc(),
		CreateAtmCashDispenserSvc(),
		CreateAtmBankSvc(),
	}

	for _, service := range services {
		target, err := service.Parse()
		if err != nil {
			log.Fatalln("Failed to parse url for service", service.Name())
		}
		log.Printf("Parse success URL = %s for service %s\n", target.Host, service.Name())
		proxy := httputil.NewSingleHostReverseProxy(target)
		handler := http.StripPrefix(service.prefix, proxy)
		nHandler := http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
			rw.Header().Set("Access-Control-Allow-Origin", "*")
			rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			rw.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

			r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))

			rw.Header().Set("Access-Control-Allow-Origin", "*")
			handler.ServeHTTP(rw, r)
		})
		http.Handle(service.prefix, nHandler)
	}

	log.Fatal(http.ListenAndServe(os.Getenv("PORT"), nil))
}
