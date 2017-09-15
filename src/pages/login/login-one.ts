import { Component } from '@angular/core';
import { App, LoadingController,  NavController } from 'ionic-angular';


import {UserRegisterPage} from "../user-register/user-register";
import {FindPasswordPage} from "../find-password/find-password";
import { HomePage } from "../home/home";
import { UserService } from "../../app/user.service";
import { FormBuilder ,FormControl,Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-login-one',
  templateUrl: 'login-one.html',
  providers:[ UserService ],
})
export class LoginOnePage {

  loginForm = this.formBuilder.group({
    'userName': ['',[Validators.maxLength(11)]],
    'userPassword': ['', [Validators.maxLength(20)]]

  });
  public func = "login"
  public backgroundImage = 'assets/img/background/login-background.jpg';

  constructor(
    public loadingCtrl: LoadingController,
    public app: App,
    public navCtrl: NavController,
    private UService:UserService,
    private formBuilder:FormBuilder


  ) {}
  login(event){
    console.log(event)
  }
  sinup(event){
    console.log(event)
  }
  userLogin(event) {
    //TODO：进行登录判断，成功跳转至HOME
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    loading.present();
    // 登录
    this.UService.handle(this.func, event.userName, event.userPassword)
  }
  // getUserName(username: string){
  //   this.User.name = username
  // }
  // getUserPassword(userpassword: string){
  //   this.User.password= userpassword
  // }

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

