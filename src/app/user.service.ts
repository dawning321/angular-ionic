
import { LoginOnePage} from "../pages/login/login-one";
import { AlertController, App, LoadingController,  NavController } from 'ionic-angular';
import { HomePage } from "../pages/home/home";
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  public wsLogin:WebSocket
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,

  ) {
    // 连接websocket
    this.wsLogin = new WebSocket('ws://localhost:8103/wsLogin')

    // 接收服务端发来的消息，分类处理
    this.wsLogin.onmessage = function (event) {
      var data = JSON.parse(event.data)
      console.log(event)
      if (data.Func == "login"){
        if (data.Success == true){
          navCtrl.push( HomePage )
        }else {
          const alert = alertCtrl.create({
            title: "error",
            subTitle: data.ErrorMessage,
            buttons: ['Dismiss'],
          });
          alert.present();
        }
      }else if(data.Func == "register"){
        if (data.Func == "register"){
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
        }else {
          console.log("not fucntion")
        }
      }

    }
  }
  // 处理登录和注册
  handle(func:string,name:string,password:string) {
    this.wsLogin.send(JSON.stringify({func:func,Username:name, password:password,success:false,errorMessage:""}));
    console.log("send ",func)
  }
}
