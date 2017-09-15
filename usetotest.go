package main

import (
  "net/http"
  "fmt"
  "io/ioutil"
)

func main() {
  client := &http.Client{}
  host := "http://smsapi.api51.cn"
  path := "/code/"
  method := "GET"
  appcode := "47a017e290b14f63aaf8265f02ff68cf"
  querys := "code=8888&mobile=18459181xxx"
  url := host + path + "?" + querys

  reqest,_ := http.NewRequest(method, url,nil)
  reqest.Header.Add("Authorization","APPCODE"+appcode)

  response,_:= client.Do(reqest)
  defer response.Body.Close()

  if response.StatusCode == 200 {
    body, _ := ioutil.ReadAll(response.Body)
    bodystr := string(body)
    fmt.Println(bodystr)
  }
  fmt.Println(response)
}


