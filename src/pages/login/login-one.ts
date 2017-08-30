import { Component } from '@angular/core';
import { App, LoadingController,  NavController } from 'ionic-angular';

import {UserRegisterPage} from "../user-register/user-register";
import {FindPasswordPage} from "../find-password/find-password";
import { HomePage } from "../home/home";
import { UserService } from "../../app/user.service";


@Component({
  selector: 'page-login-one',
  templateUrl: 'login-one.html',
  providers:[ UserService ],
})
export class LoginOnePage {

  User: user = {
    func:"login",
    name:'',
    password:'',
    success:false,
    errorMessage:''
  }
  public backgroundImage = 'assets/img/background/login-background.jpg';

  constructor(
    public loadingCtrl: LoadingController,
    public app: App,
    public navCtrl: NavController,
    public UService:UserService

  ) {}

  userLogin() {
    //TODO：进行登录判断，成功跳转至HOME
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    loading.present();
    // 登录
    this.UService.handle(this.User.func, this.User.name, this.User.password)
  }
  getUserName(username: string){
    this.User.name = username
  }
  getUserPassword(userpassword: string){
    this.User.password= userpassword
  }

  // 跳转至注册页面
  userRegister(){
    this.navCtrl.push( UserRegisterPage )
  }
  // 游客直接登录
  touristLogin(){
    this.navCtrl.push( HomePage )

  }
  // 跳转到找回密码页面
  findPassword(){
    this.navCtrl.push( FindPasswordPage )
  }
}

export class user{
  func:string
  name: string
  password: string
  success: boolean
  errorMessage: string
}
