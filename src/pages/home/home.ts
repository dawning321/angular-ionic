import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AlertController} from "ionic-angular";
import { LoginOnePage } from "../login/login-one";
import { SubscriptService } from "../../app/subscript.service";
//import { SubscriptMarketPage } from "../subscript-market/subscript-market";
//import { RecieveDeptmarketService } from "../../app/recieve-deptmarket.service";
import { ShowDeptMarketPage } from "../show-dept-market/show-dept-market";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[ SubscriptService]
})
export class HomePage {
  openMenu = false;
  username: string= ''
  //lastPrice = this.recService.Announced$.subscribe()


  constructor(

    public navCtrl: NavController,
    public alertCtrl:AlertController,
    public navParams:NavParams,
    public subService:SubscriptService,
   // public recService:RecieveDeptmarketService,

  ) {

    this.username = navParams.data

//TODO:根据this.username查询账户信息
    // this.wsd.addEventListener("message",function (event) {
    //   var data = JSON.parse(event.data)
    //   console.log(" i in depeMaket")
    //   console.log(data)
    //
    // })

  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  // 账户信息
  goToUser() {
    let alert = this.alertCtrl.create({
      title: '账户信息',
      subTitle:this.username,
      buttons: [
        {
          text: '修改密码',
          //role: 'cancel',

        },
        {
          text: '退出登录',
          handler: () => {
            // TODO:保存当前
            this.navCtrl.push(LoginOnePage)
          }
        }
      ]
    });
    alert.present();
    this.togglePopupMenu();
  }

  // 订阅
  goToSubscript() {
    let prompt = this.alertCtrl.create({
      title: "订阅",
      message: "输入合约代码",
      inputs: [
        {
          name: 'symbol',
          placeholder: 'IF1709'  //TODO:获取当月IF
        },
      ],
      buttons: [
        {
          text: "取消",
          handler: data => {
            this.navCtrl.push(ShowDeptMarketPage)
          }
        },
        {
          text: "确认",
          handler: data => {
            console.log(data.symbol);
            // 发送输入的行情
            this.subService.subscript("subscriptSymbol",data.symbol)

          }
        }
      ]
    });
    prompt.present();
    this.togglePopupMenu();
  }


  // 交易
  goToTrader() {
    alert('Leaderboard clicked.');
    this.togglePopupMenu();
  }

  // 查询持仓
  goToAccount() {
    alert('Help clicked.');
    this.togglePopupMenu();
  }

  // 帮助
  goToHelp() {
    alert('Shop clicked.');
    this.togglePopupMenu();
  }

  // 退出
  goToExit() {
    alert('Shop clicked.');
    this.togglePopupMenu();
  }
}
