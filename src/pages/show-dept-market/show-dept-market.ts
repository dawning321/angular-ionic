import { Component,AfterViewChecked} from '@angular/core';
import { IonicPage}  from 'ionic-angular';
import { AlertController, App, LoadingController,  NavController } from 'ionic-angular';
import { Market} from "../../app/market";

/**
 * Generated class for the ShowDeptMarketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-dept-market',
  templateUrl: 'show-dept-market.html',
})
export class ShowDeptMarketPage implements AfterViewChecked{
  //   deMarket:Market={
  //     // 代码相关
  //   Symbol:getMarket.Symbol,
  //   Exchange: getMarket.Exchange,
  //   VtSymbol: getMarket.VtSymbol,
  //
  //   //　成交数据
  //   LastPrice:getMarket.LastPrice,
  //   LastVolume:getMarket.LastVolume,
  //   Volume:	getMarket.Volume,
  //   OpenInterest: getMarket.OpenInterest,
  //   Time: getMarket.Time,
  //   Date: getMarket.Date,
  //   Datetaime:getMarket.Datetaime,
  //
  //   //　常规行情
  //   OpenPrice: getMarket.OpenPrice,
  //   HighPrice: getMarket.HighPrice,
  //   LowPrice: getMarket.LowPrice,
  //   PreClosePrice:getMarket.PreClosePrice,
  //   UpperLimit:	getMarket.UpperLimit,
  //   LowerLimit:	getMarket.LowerLimit,
  //
  //   //　五档行情（ctp只有一档）
  //   BidPrice1:getMarket.BidPrice1,
  //   AskPrice1: getMarket.AskPrice1,
  //   BidVolume1: getMarket.BidVolume1,
  //   AskVolume1:	getMarket.AskVolume1,
  // }
   deMarket:Market={

    // 代码相关
    Symbol:"",
    Exchange: "",
    VtSymbol: "",

    //　成交数据
    LastPrice:"",
    LastVolume:"",
    Volume:	"",
    OpenInterest: "",
    Time: "",
    Date: "",
    Datetaime:"",

    //　常规行情
    OpenPrice: "",
    HighPrice: "",
    LowPrice: "",
    PreClosePrice:"",
    UpperLimit:	"",
    LowerLimit:	"",

    //　五档行情（ctp只有一档）
    BidPrice1:"",
    AskPrice1: "",
    BidVolume1: "",
    AskVolume1:	"",
  }



  ngAfterViewChecked(){
    setInterval(()=> this.deMarket = getMarket,500)
    // this.deMarket = getMarket
    // this.deMarket = getMarket
  }




  // public Announced$ = this.AnnouncedSource.asObservable();



  public wsMarket:WebSocket
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    // public deptMarket:Market
    //public AnnouncedSource:Subject<string>

  ){

  }
}

var getMarket:Market={

  // 代码相关
  Symbol:"",
  Exchange: "",
  VtSymbol: "",

  //　成交数据
  LastPrice:"",
  LastVolume:"",
  Volume:	"",
  OpenInterest: "",
  Time: "",
  Date: "",
  Datetaime:"",

  //　常规行情
  OpenPrice: "",
  HighPrice: "",
  LowPrice: "",
  PreClosePrice:"",
  UpperLimit:	"",
  LowerLimit:	"",

  //　五档行情（ctp只有一档）
  BidPrice1:"",
  AskPrice1: "",
  BidVolume1: "",
  AskVolume1:	"",
}

var symbolName: { [key:string]:string} = {
  "one":"", "two":"",
  "third":"", "four":"",
  "five":"", "six":"",
  "seven":"", "eight":"",
  "nine":"","ten":""}
var symbolNumbers:number = 0
this.wsMarket = new WebSocket('ws://localhost:8106/deptMarket')
this.wsMarket.onmessage = function (event) {

  var data = JSON.parse(event.data)
  console.log(" I am in depeMaket　０００")
  console.log(data)

  if (symbolName["one"] == "" ){ 　//判断是否第一次接收数据
    symbolName["one"] = data.Symbol
    symbolNumbers ++
    getMarket = data
    console.log("this is getMarket:",getMarket)

    // TODO:
  }else{
    for (var k in symbolName){
      if (symbolName[k] == data.Symbol){  // 该品种是否存在？
        getMarket = data
        console.log("this is getMarket:",getMarket)

        //TODO:
      }else {
        var i = 0
        for (var k in symbolName){
          if (i == symbolNumbers){
            symbolName[k]=data.Symbol
            symbolNumbers ++
            getMarket = data
            console.log("this is getMarket:",getMarket)
            //TODO:
            break
          }
          i ++
        }
      }
    }
  }
}


