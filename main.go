package main

import (
  "net/http"
  "log"
  "github.com/gorilla/websocket"
  "fmt"

  "myApp/handler"

)

type User struct {
  Func string
  Username string `json:"username"`
  Password  string `json:"password"`
  Success bool
  ErrorMessage string

}

var clients = make(map[*websocket.Conn]bool) // connected clients
var loginChan = make(chan User)           // broadcast channel
var registerChan = make(chan User)
// Configure the upgrader
var upgrader = websocket.Upgrader{
  CheckOrigin: func(r *http.Request) bool {
    return true
  },
}
func main(){
  fmt.Println("Hello")
  fs := http.FileServer(http.Dir("src"))

  http.Handle("/", fs)

  http.HandleFunc("/wsLogin", handleConnections)

 // http.HandleFunc("/wsRegister", handleRegisterConnections)
  //go handleRegister()
 // go handleLogin()

  err := http.ListenAndServe(":8103", nil)
  if err != nil {
    log.Fatal("ListenAndServe: ", err)
  }
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
  // Upgrade initial GET request to a websocket
  ws, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Fatal(err)
  }
  // Make sure we close the connection when the function returns
  defer ws.Close()

  // Register our new client
  clients[ws] = true

  for {
    var msg User
    // Read in a new message as JSON and map it to a Message object
    err := ws.ReadJSON(&msg)
    if err != nil {
      log.Printf("error: %v", err)
      delete(clients, ws)
      break
    }
    fmt.Println(msg.Func)
    if msg.Func == ""{
        fmt.Println("not function")
      break

    }else if msg.Func == "login"{
      go handleLogin()
      loginChan <- msg


    }else if msg.Func == "register" {
      go handleRegister()
      registerChan <- msg


    } else {
      fmt.Println("function error")
      break
    }
    // Send the newly received message to the broadcast channel
    fmt.Println(msg)

    //broadcast <- msg
  }
}

//func handleRegisterConnections(w http.ResponseWriter, r *http.Request) {
//  // Upgrade initial GET request to a websocket
//  ws, err := upgrader.Upgrade(w, r, nil)
//  if err != nil {
//    log.Fatal(err)
//  }
//  // Make sure we close the connection when the function returns
//  defer ws.Close()
//
//  // Register our new client
//  clients[ws] = true
//
//  for {
//    var msg User
//    // Read in a new message as JSON and map it to a Message object
//    err := ws.ReadJSON(&msg)
//    if err != nil {
//      log.Printf("error: %v", err)
//      delete(clients, ws)
//      break
//    }
//    // Send the newly received message to the broadcast channel
//    fmt.Println(msg)
//
//    registerChan <- msg
//  }
//}


func handleLogin(){
  for {
    // Grab the next message from the broadcast channel
    msg := <- loginChan

    var  a handler.Xuser

    TF,errorMessage := handler.Xuser.Login(a,msg.Username,msg.Password)

    msg.Success = TF
    msg.ErrorMessage = errorMessage

    // Send it out to every client that is currently connected
    for client := range clients {
      err := client.WriteJSON(msg)

      fmt.Println("send responed:",msg)
      break
      if err != nil {
        log.Printf("error: %v", err)
        client.Close()
        delete(clients, client)

      }
    }
  }
}

func handleRegister(){
  for {
    // Grab the next message from the broadcast channel
    msg := <-registerChan

    var  a handler.Xuser

    TF,errRegister := handler.Xuser.Register(a,msg.Username,msg.Password)

    msg.Success = TF
    msg.ErrorMessage = errRegister

    // Send it out to every client that is currently connected
    for client := range clients {
      err := client.WriteJSON(msg)

      fmt.Println("registger responed:",msg)
      break
      if err != nil {
        log.Printf("error: %v", err)
        client.Close()
        delete(clients, client)

      }
    }
  }
}
