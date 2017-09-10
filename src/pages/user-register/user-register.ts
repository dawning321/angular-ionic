import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { USER} from "../../app/user";
import {UserService} from "../../app/user.service";



@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
  providers: [ UserService ],
})
export class UserRegisterPage {
  User: USER = {
    func:"register",
    name:'',
    password:'',
    newPassword:'',
    success:false,
    errorMessage:''
  }
  userinput:UserInput = {
    tel:'',
    passwordOne:'',
    passwordTwo:''
  }
  constructor(
    public alertCtrl: AlertController,
    private UService: UserService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegisterPage');
  }
  getTel(tel:string){
    this.userinput.tel = tel
  }
  getPasswordOne(pwOne:string){
    this.userinput.passwordOne = pwOne
  }
  getPasswordTwo(pwTwo:string){
    this.userinput.passwordTwo = pwTwo
  }
  sendVerificationCode(){
//TODO:请求服务器发送验证码
  }
  toRegister(){
    console.log(this.userinput)
    // 检查两次输入的密码是否一致
    if (this.userinput.passwordOne !== this.userinput.passwordTwo){
      const alert = this.alertCtrl.create({
        title: "error",
        subTitle: "Entered passwords differ!",
        buttons: ['Dismiss'],
      });
      alert.present();
    }
    this.UService.handle(this.User.func,this.userinput.tel,this.userinput.passwordOne)
//TODO:验证验证码，验证用户手机是否注册
  }

}
export class UserInput{
  tel:string
  passwordOne:string
  passwordTwo:string

}
