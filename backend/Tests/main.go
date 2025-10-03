package main

import (
    "fmt"
    "io"
    "net/http"
    "time"
)

func main() {
    c := http.Client{Timeout: time.Duration(1) * time.Second}
    limit := 100

    for i := 1; i < limit; i++ {
        resp, err := c.Get("http://localhost:8080/posts")
        if err != nil {
            fmt.Printf("Error %s", err)
            fmt.Println("Count is: ", i)
            return
        }
        defer resp.Body.Close()
        body, err := io.ReadAll(resp.Body)
		if(err != nil) { 
			fmt.Println("Error reading the response body")
		}
        fmt.Printf("Body : %s", body)
    }
}
