package handler

import (
  "fmt"
  "myApp/model"

)

type Xuser struct{}

// 登录
func (Xuser) Login(username, password string) (TF bool,errorMassage string){
  user := model.User{
    Username: username,
    Password: password,
  }
  if user.Username == "" || user.Password == "" {
    errorMassage := "账号或密码为空"
    fmt.Println(errorMassage)
    return false,errorMassage
  }
  // SELECT * FROM users WHERE Username = username AND Password = password LIMIT 1
  if err := model.DB.Where(&user).First(&user).Error; err != nil {
    errorMassage := "账号或密码做错误"
    fmt.Println("账号或密码做错误")
    return false,errorMassage
  }
  fmt.Println("Login Success")
  return true, ""
}

// 注册
func (Xuser)Register(tel, password string)(TF bool,errorMassage string){
  user := model.User{
    Username: tel,
    Password: password,
  }
  if err := model.DB.Where(&user).First(&user).Error; err != nil {
    if err := model.DB.Create(&user).Error; err != nil {
      errorMassage = "注册失败"
      fmt.Println("register failed :", err)
      return false,errorMassage
    }
    // 注册成功
    fmt.Println("Register Success")
    return true,""
  }else{
    errorMassage = "该手机号已被注册"
    fmt.Println("该手机号已被注册")
    return  false,errorMassage
  }
}

// 修改密码
func (Xuser)ChangePassword(username,oldPassword,newPassword string)(TF bool,errorMassage string){
  user := model.User{
    Username: username,
    Password: oldPassword,
  }
  if err := model.DB.Where(&user).First(&user).Error; err != nil{
      fmt.Println("原密码输入错误")
    errorMassage = "原密码输入错误"
    return false, errorMassage
  }
  model.DB.Model(&user).Update("password", newPassword)
  fmt.Println("修改成功！")
  errorMassage = "修改成功"
  return true, errorMassage
}


// ----------- test -------------
//func main(){
//  fmt.Println("open")
//  var  us Xuser
//  us.ChangePassword("admin","666666","111111" +
//    "")
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
