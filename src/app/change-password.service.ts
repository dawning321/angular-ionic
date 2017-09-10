
import { LoginOnePage} from "../pages/login/login-one";
import { AlertController, App, LoadingController,  NavController } from 'ionic-angular';
import { HomePage } from "../pages/home/home";
import { Injectable} from '@angular/core';


@Injectable()
export class ChangePasswordService {
  public wsLogin:WebSocket
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,

  ) {
    // 连接websocket
    this.wsLogin = new WebSocket('ws://localhost:8106/wsLogin')

    // 接收服务端发来的消息，分类处理
    this.wsLogin.onmessage = function (event) {
      var data = JSON.parse(event.data)
      console.log(event)

      if (data.Func == "login"){  //登录返回
        if (data.Success == true){
          console.log(data.username)
          navCtrl.push( HomePage,data.username )
        }else {
          const alert = alertCtrl.create({
            title: "error",
            subTitle: data.ErrorMessage,
            buttons: ['Dismiss'],
          });
          alert.present();
        }


      }else if(data.Func == "register"){  // 注册返回
        if (data.Success == true){
          navCtrl.push( LoginOnePage )
        }else {
          const alert = alertCtrl.create({
            title: "error",
            subTitle: data.ErrorMessage,
            buttons: ['Dismiss'],
          });
          alert.present();
        }


      }else if(data.Func == "changePassword"){  // 注册返回
        if (data.Success == true){
          // TODO:展示＂修改成功＂１秒
          navCtrl.push( LoginOnePage )

        }else {
          const alert = alertCtrl.create({
            title: "error",
            subTitle: data.ErrorMessage,
            buttons: ['Dismiss'],
          });
          alert.present();
        }
      } else {
        console.log("not fucntion")
      }

    }
  }
  // 修改密码
  handleChangePassword(func,name,password,newPassword:string){
    this.wsLogin.send(JSON.stringify({Func:func,Username:name, Password:password,NewPassword:newPassword,Success:false,ErrorMessage:""}));
    console.log("send ",func)
  }
}
