import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { FormBuilder ,FormControl,Validators,AbstractControl } from '@angular/forms';

import { USER} from "../../app/user";
import {UserService} from "../../app/user.service";




@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
  providers: [ UserService ],
})
export class UserRegisterPage {
  registerForm = this.formBuilder.group({
    'regTelephone': ['',[Validators.maxLength(11)]],
    'password': ['', [Validators.maxLength(20)]],
    'confirmPassword': ['', [Validators.maxLength(20)]],
    'vcode':['']
  });

  disabled=false
  sendVcodeButton = "发送验证码"
  countDown = 5
  public A:any

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
    passwordTwo:'',
    vcode:''
  }
  constructor(
    public alertCtrl: AlertController,
    private UService: UserService,
    private formBuilder:FormBuilder,

  ) {}
  reg(event){
    console.log(event)
  }
  aaa(){
    this.sendVcodeButton = "重新发送" + "(" + this.countDown-- + ")"
    if (this.countDown == -1){
      this.disabled = false
      this.sendVcodeButton = "发送验证码"
      this.countDown = 60
      clearInterval(this.A)
    }
  }
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

  sendVcode(event){
    if (event.regTelephone == ''){
      alert("请输入手机号码")
    }else {
      console.log(event)
      this.disabled = true
      this.UService.handle("sendVcode",event.regTelephone,"")
//TODO:请求服务器发送验证码
      this.A = setInterval(()=>this.aaa(),1000)
    }


    //this.UService.handle("sendvcode","","")
    //console.log(event)
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
  // down(){
  //   this.sendVcodeButton = "重新发送"+ "("+ this.countDown-- +")"
  //   if (this.countDown === 0){
  //     this.disabled = false
  //     this.sendVcodeButton = "发送验证码"
  //     // clearInterval(this.sendVcode().timer1)
  //   }
  // }

}
export class UserInput{
  tel:string
  passwordOne:string
  passwordTwo:string
  vcode:string

}
