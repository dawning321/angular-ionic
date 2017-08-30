package handler

import (
  "fmt"

 // "github.com/hprose/hprose-golang/rpc"
 // "github.com/miaolz123/samaritan/constant"
  //"github.com/miaolz123/samaritan/model"
  "myApp/model"

  "log"
)

type Xuser struct{}

// Login ...
func (Xuser) Login(username, password string) (TF bool,errorMassage string){
  user := model.User{
    Username: username,
    Password: password,
  }
  if user.Username == "" || user.Password == "" {
    errorMassage := "Username and Password can not be empty"
    fmt.Println(errorMassage)
    //resp.Message = "Username and Password can not be empty"
    return false,errorMassage
  }
  // SELECT * FROM users WHERE Username = username AND Password = password LIMIT 1
  if err := model.DB.Where(&user).First(&user).Error; err != nil {
    errorMassage := "Username or Password wrong"
    fmt.Println("Username or Password wrong")
    //resp.Message = "Username or Password wrong"
    return false,errorMassage
  }
  fmt.Println("Success")

  //resp.Success = true

  return true, ""
}

func (Xuser)Register(tel, password string)(TF bool,errorMassage string){
  user := model.User{
    Username: tel,
    Password: password,
  }
  if err := model.DB.Where(&user).First(&user).Error; err != nil {
    if err := model.DB.Create(&user).Error; err != nil {
      errorMassage = "register failed "
      log.Fatalln("register failed :", err)
      return false,"register failed "
    }
    return true,""
  }else{
    errorMassage = "the telephone already registered"
    fmt.Println("the telephone already registered")
    return  false,errorMassage
  }
}
// ----------- test -------------
//func main(){
//  fmt.Println()
//  var  us Xuser
//  us.Login("","")
//}

//
//func main(){
//  var us Xuser
//  TF,err:= us.Register("1845918282","kobekobe520")
//  if err!= nil {
//    fmt.Println(err)
//  }
//  fmt.Println(TF)
//
//}
