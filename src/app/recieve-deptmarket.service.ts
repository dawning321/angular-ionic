//
// import { AlertController, App, LoadingController,  NavController } from 'ionic-angular';
// import {Injectable, OnInit, Output} from '@angular/core';
// import {Market} from "./market";
//
// //import { Subject }    from 'rxjs/Subject';
//
//
// @Injectable()
// export class RecieveDeptmarketService {
//
//  // public Announced$ = this.AnnouncedSource.asObservable();
//   deMarket:Market={
//     // 代码相关
//     symbol:"",
//     exchange: "",
//     vtSymbol: "",
//
//     //　成交数据
//     lastPrice:"",
//     lastVolume:"",
//     volume:	"",
//     openInterest: "",
//     time: "",
//     date: "",
//     datetaime:"",
//
//     //　常规行情
//     openPrice: "",
//     highPrice: "",
//     lowPrice: "",
//     preClosePrice:"",
//     upperLimit:	"",
//     lowerLimit:	"",
//
//     //　五档行情（ctp只有一档）
//     bidPrice1:"",
//     askPrice1: "",
//     bidVolume1: "",
//     askVolume1:	"",
//   }
//
//
//   var wsMarket:WebSocket
//   constructor(
//     public loadingCtrl: LoadingController,
//     public alertCtrl: AlertController,
//     public app: App,
//    // public deptMarket:Market
//     //public AnnouncedSource:Subject<string>
//
//   ){
//
//     //  AnnouncedSource.next(data.lastPrice)
//
//     }
//
//   symbolName: { [key:string]:string} = {
//     "one":"", "two":"",
//     "third":"", "four":"",
//     "five":"", "six":"",
//     "seven":"", "eight":"",
//     "nine":"","ten":""}
//   symbolNumbers:number = 0
//   wsMarket = new WebSocket('ws://localhost:8106/deptMarket')
//   wsMarket.onmessage = function (event) {
//
//     var data = JSON.parse(event.data)
//     console.log(" I am in depeMaket　０００")
//     console.log(data)
//
//     if (symbolName["one"] == "") { 　//判断是否第一次接收数据
//       symbolName["one"] = data.Symbol
//       symbolNumbers++
//       this.deMarket.symbol = data.Symbol
//       this.deMarket.lastPrice = data.lastPrice
//
//       // TODO:
//     } else {
//       for (var k in symbolName) {
//         if (symbolName[k] == data.Symbol) {  // 该品种是否存在？
//           this.deMarket.symbol = data.Symbol
//           this.deMarket.lastPrice = data.lastPrice
//           //TODO:
//         } else {
//           var i = 0
//           for (var k in symbolName) {
//             if (i == symbolNumbers) {
//               symbolName[k] = data.Symbol
//               symbolNumbers++
//               this.deMarket.symbol = data.Symbol
//               this.deMarket.lastPrice = data.lastPrice
//               //TODO:
//               break
//             }
//             i++
//           }
//
//
//         }
//       }
//     }
//
//
//   }
//   }
//
//
//
