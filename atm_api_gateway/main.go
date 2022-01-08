package main

import (
	"crypto/tls"
	"log"
	"net/http"
	"net/http/httputil"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	var services []*Service = []*Service{
		CreateAtmCashDispenserSvc(),
	}

	for _, service := range services {
		target, err := service.Parse()
		if err != nil {
			log.Fatalln("Failed to parse url for service", service.Name())
		}
		log.Println("scheme = ", target.Scheme)
		log.Println("host   = ", target.Host)
		proxy := httputil.NewSingleHostReverseProxy(target)
		proxy.Transport = &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		}
		handler := http.StripPrefix(service.prefix, proxy)
		nHandler := http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
			log.Println(r.URL.Path)
			log.Println(r.URL.RawPath)
			log.Println(r.Host)
			handler.ServeHTTP(rw, r)
		})
		http.Handle(service.prefix, nHandler)
	}

	log.Fatal(http.ListenAndServe(":8080", nil))
}
