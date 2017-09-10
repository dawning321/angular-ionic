import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SubscriptMarketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscript-market',
  templateUrl: 'subscript-market.html',
})
export class SubscriptMarketPage {

  public wsMarket:WebSocket
  constructor(
    public navCtrl: NavController,
  ){
    this.wsMarket = new WebSocket('ws://localhost:8106/deptMarket')
    this.wsMarket.onmessage = function (event) {

      console.log(" i in depeMaket")
      console.log(event.data)
    }
  }
  // send(){
  //   this.wsMarket.send({Func:this.deptMarket.time,Username:"qqq", Password:"dd",NewPassword:"d",Success:false,ErrorMessage:"df"})
  // }

}

