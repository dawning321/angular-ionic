import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { ChangePasswordService } from "../../app/change-password.service";
import { USER } from "../../app/user";

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
  providers: [ ChangePasswordService ],
})

export class ChangePasswordPage {

  User: USER = {
    func:"changePassword",
    name:'',
    password:'',
    newPassword:'',
    success:false,
    errorMessage:''
  }
  ChangePasswordUser: UserInput={
    oldPassword:"",
    NewPasswordOne:"",
    NewPasswordTwo:"",
  }


 //
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private CPService: ChangePasswordService,

  ) {
    this.User.name = navParams.data
    // console.log(navParams.data)
  }


  getOldPassword(oldPassword:string){
    this.ChangePasswordUser.oldPassword = oldPassword
  }
  getNewPasswordOne(newPasswordOne: string){
    this.ChangePasswordUser.NewPasswordOne = newPasswordOne
  }
  getNewPassWordTwo(newPasswordTwo: string){
    this.ChangePasswordUser.NewPasswordTwo = newPasswordTwo
  }

  toChange(){
    if (this.ChangePasswordUser.NewPasswordOne  !== this.ChangePasswordUser.NewPasswordTwo){
      const alert = this.alertCtrl.create({
        title: "错误",
        subTitle: "两次密码不一致!",
        buttons: ['Dismiss'],
      });
      alert.present();
    }
    // 发送
    this.CPService.handleChangePassword(this.User.func,this.User.name,this.ChangePasswordUser.oldPassword,this.ChangePasswordUser.NewPasswordOne)
  }
}

export class UserInput{
  oldPassword:string
  NewPasswordOne:string
  NewPasswordTwo:string
}

