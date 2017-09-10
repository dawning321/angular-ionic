package handler
import (
  "net/http"
  "log"
  "github.com/gorilla/websocket"
  "fmt"
  "myApp/goctp/_example"

)

type User struct {
  Func string
  Username string `json:"username"`
  Password  string `json:"password"`
  NewPassword string
  Success bool
  ErrorMessage string

}

var (
  pMdSpi  = _example.NewDirectorCThostFtdcMdSpi(&_example.GoCThostFtdcMdSpi{Client: _example.CTP})

  loginChan = make(chan User) //　登录数据通道
  registerChan = make(chan User)  //　注册数据通道
  changePasswordChan = make(chan User) //　修改密码通道
  subscriptChan = make(chan User) // 订阅代码通道


  clients = make(map[*websocket.Conn]bool)  //　已经连接的websocket clients
  upgrader = websocket.Upgrader{  // 设置upgrader
    CheckOrigin: func(r *http.Request) bool {
      return true
    },
  }
)



// 处理websocket连接
func HandleConnections(w http.ResponseWriter, r *http.Request) {

  // websocket接收request
  ws, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Fatal(err)
  }
  defer ws.Close()

  // 注册新的client
  clients[ws] = true

  for {
    var msg User
    // 读出json格式的数据
    err := ws.ReadJSON(&msg)
    if err != nil {
      log.Printf("error: %v", err)
      delete(clients, ws)
      break
    }
    fmt.Println("The request from Client is:",msg)

    // 判断数据的请求类型，分配不同的处理函数
    if msg.Func == ""{
      fmt.Println("not function")
      break

    }else if msg.Func == "login"{
      fmt.Println("goto login")
      // 处理登录请求
      go HandleLogin()
      loginChan <- msg

    }else if msg.Func == "register" {
      fmt.Println("goto register")
      // 处理注册请求
      go HandleRegister()
      registerChan <- msg

    }else if msg.Func == "changePassword" {
      fmt.Println("goto changePassword")
      // 处理修改密码请求
      go HandleChangePassword()
      changePasswordChan <- msg

    }else if msg.Func == "subscriptSymbol"{
      fmt.Println("goto subscriptSymbol")
      // 处理登录请求
      go HandleSubscriptDeptMarket()
      subscriptChan <- msg


    }else {
      fmt.Println("function error")
      break
    }
  }
}


func GoctpInit(){

  log.Printf("客户端配置: %+#v\n", _example.CTP)
  _example.CTP.MdApi.RegisterSpi(pMdSpi)
  _example.CTP.MdApi.RegisterFront(_example.CTP.MdFront)
  _example.CTP.MdApi.Init()
  _example.CTP.MdApi.Join()
  _example.CTP.MdApi.Release()
}

var subscriptedSymbols = []string{}

func HandleSubscriptDeptMarket() {


  for {

    msg := <-subscriptChan


    fmt.Println("当前：", msg.Username)
    symbol := "IF1709"

    subscriptedSymbols = append(subscriptedSymbols, symbol)
    fmt.Println("增加后：", subscriptedSymbols)
    _example.CTP.MdApi.SubscribeMarketData(subscriptedSymbols)

    //if len(subscriptedSymbols) > 0 {
    //  for _, subSymbol := range subscriptedSymbols {
    //    if subSymbol == symbol {
    //    fmt.Println("%v已经订阅", subSymbol)
    //    }
    //    subscriptedSymbols = append(subscriptedSymbols, symbol)
    //    fmt.Println("增加后：", subscriptedSymbols)
    //    _example.CTP.MdApi.SubscribeMarketData(subscriptedSymbols)
    //    break
    //  }
    //} else {
    //  subscriptedSymbols = append(subscriptedSymbols, symbol)
    //  fmt.Println("增加后：", subscriptedSymbols)
    //  _example.CTP.MdApi.SubscribeMarketData(subscriptedSymbols)
    //  break
    //}
  }
}



func HandleLogin(){
  for {
    var a Xuser

    // 得到登录请求数据
    msg := <- loginChan

    // 调用登录函数，返回值类型分别为：bool，错误信息
    TF,errorMessage := Xuser.Login(a,msg.Username,msg.Password)
    msg.Success = TF
    msg.ErrorMessage = errorMessage

   // HandleSubscriptDeptMarket()
    // 把回应信息发送给每个client
    for client := range clients {
      err := client.WriteJSON(msg)

      fmt.Println("send responed:",msg)
      break // 只发送一次
      if err != nil {
        log.Printf("error: %v", err)
        client.Close()
        delete(clients, client)

      }
    }
  }
}

func HandleRegister(){
  for {
    var  a Xuser
    // 得到注册请求数据
    msg := <-registerChan
    // TODO:验证码msg.yzCode判断：true -> go on, false -> errorMessage＝＂验证码错误＂
    // 调用注册函数，返回值类型分别为：bool，错误信息
    TF,errRegister := Xuser.Register(a,msg.Username,msg.Password)
    msg.Success = TF
    msg.ErrorMessage = errRegister

    // 为把回应信息发送给每个client
    for client := range clients {
      err := client.WriteJSON(msg)

      fmt.Println("registger responed:",msg)
      break   // 只发送一次
      if err != nil {
        log.Printf("error: %v", err)
        client.Close()
        delete(clients, client)

      }
    }
  }
}

func HandleChangePassword(){
  for {
    var  a Xuser
    // 得到注册请求数据
    msg := <- changePasswordChan

    fmt.Println("ready ...",msg)
    // TODO:验证码msg.yzCode判断：true -> go on, false -> errorMessage＝＂验证码错误＂
    // 调用注册函数，返回值类型分别为：bool，错误信息
    TF,errRegister := Xuser.ChangePassword(a,msg.Username,msg.Password,msg.NewPassword)
    fmt.Println("over...")
    msg.Success = TF
    msg.ErrorMessage = errRegister

    // 为把回应信息发送给每个client
    for client := range clients {
      err := client.WriteJSON(msg)

      fmt.Println("changePassword responed:",msg)
      break   // 只发送一次
      if err != nil {
        log.Printf("error: %v", err)
        client.Close()
        delete(clients, client)
      }
    }
  }
}

