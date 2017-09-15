package main

import (
  "net/http"
  "log"
  "fmt"

  "myApp/handler"
  "myApp/goctp/_example"
)

func main(){
  fmt.Println("Hello")
  go handler.GoctpInit()

  fs := http.FileServer(http.Dir("src"))
  http.Handle("/", fs)
  http.HandleFunc("/wsLogin",handler.HandleConnections)
  http.HandleFunc("/deptMarket",_example.HandleDeptMarketConnections)

  err := http.ListenAndServe(":8106", nil)
  if err != nil {
    log.Fatal("ListenAndServe: ", err)
  }
}
