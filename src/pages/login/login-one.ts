//import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertController, App, LoadingController,  NavController } from 'ionic-angular';
import {UserRegisterPage} from "../user-register/user-register";
import {FindPasswordPage} from "../find-password/find-password";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-login-one',
  templateUrl: 'login-one.html',
})
export class LoginOnePage {

  public loginForm: any;
  public backgroundImage = 'assets/img/background/login-background.jpg';

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,

  ) { }

  userLogin() {
    //TODO：进行登录判断，成功跳转至HOME
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Logged in!',
        subTitle: 'Thanks for logging in.',
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();

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
