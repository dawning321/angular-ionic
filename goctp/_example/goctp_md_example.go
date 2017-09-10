// Copyright 2012 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package _example

import (
	//"flag"
	"myApp/goctp"
	"log"
	//"os"
	"strings"
	"strconv"
	"time"

	//"database/sql"

	//_ "github.com/go-sql-driver/mysql"
	//"fmt"
  "fmt"

  "github.com/gorilla/websocket"
  "net/http"

)

type User struct {
  Func string
  Username string
  Password  string
  NewPassword string
  Success bool
  ErrorMessage string
  Ls string

}

var (

  clients = make(map[*websocket.Conn]bool)  //　已经连接的websocket clients
  upgrader = websocket.Upgrader{  // 设置upgrader
    CheckOrigin: func(r *http.Request) bool {
      return true
    },
  }
)
// ------------------------ deptMarket ----------------
// 处理websocket连接
func HandleDeptMarketConnections(w http.ResponseWriter, r *http.Request) {

  wsw, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Fatal(err)
  }
  defer wsw.Close()

  // 注册新的client
  clients[wsw] = true

  for {
    var msg User
    // 读出json格式的数据
    err := wsw.ReadJSON(&msg)
    if err != nil {
      log.Printf("error: %v", err)
      delete(clients, wsw)
      break
    }
    fmt.Println("The request from Client is:", msg)
  }
}





func (g *GoCTPClient) GetMdRequestID() int {
	g.MdRequestID += 1
	return g.MdRequestID
}

func (g *GoCTPClient) GetTraderRequestID() int {
	g.TraderRequestID += 1
	return g.TraderRequestID
}

func NewDirectorCThostFtdcMdSpi(v interface{}) goctp.CThostFtdcMdSpi {

	return goctp.NewDirectorCThostFtdcMdSpi(v)
}

type GoCThostFtdcMdSpi struct {
	Client GoCTPClient
}

func (p *GoCThostFtdcMdSpi) OnRspError(pRspInfo goctp.CThostFtdcRspInfoField, nRequestID int, bIsLast bool) {
	log.Println("GoCThostFtdcMdSpi.OnRspError.")
	p.IsErrorRspInfo(pRspInfo)
}

func (p *GoCThostFtdcMdSpi) OnFrontDisconnected(nReason int) {
	log.Printf("GoCThostFtdcMdSpi.OnFrontDisconnected: %#v\n", nReason)
}

func (p *GoCThostFtdcMdSpi) OnHeartBeatWarning(nTimeLapse int) {
	log.Printf("GoCThostFtdcMdSpi.OnHeartBeatWarning: %v", nTimeLapse)
}

func (p *GoCThostFtdcMdSpi) OnFrontConnected() {
	log.Println("GoCThostFtdcMdSpi.OnFrontConnected.")
	p.ReqUserLogin()
}

func (p *GoCThostFtdcMdSpi) ReqUserLogin() {
	log.Println("GoCThostFtdcMdSpi.ReqUserLo gin.")

	req := goctp.NewCThostFtdcReqUserLoginField()
	req.SetBrokerID(p.Client.BrokerID)
	req.SetUserID(p.Client.InvestorID)
	req.SetPassword(p.Client.Password)

	iResult := p.Client.MdApi.ReqUserLogin(req, p.Client.GetMdRequestID())

	if iResult != 0 {
		log.Println("发送用户登录请求: 失败.")
	} else {
		log.Println("发送用户登录请求: 成功.")
	}
}

func (p *GoCThostFtdcMdSpi) IsErrorRspInfo(pRspInfo goctp.CThostFtdcRspInfoField) bool {
	// 如果ErrorID != 0, 说明收到了错误的响应
	bResult := (pRspInfo.GetErrorID() != 0)
	if bResult {
		log.Printf("ErrorID=%v ErrorMsg=%v\n", pRspInfo.GetErrorID(), pRspInfo.GetErrorMsg())
	}
	return bResult
}

func (p *GoCThostFtdcMdSpi) OnRspUserLogin(pRspUserLogin goctp.CThostFtdcRspUserLoginField, pRspInfo goctp.CThostFtdcRspInfoField, nRequestID int, bIsLast bool) {

	if bIsLast && !p.IsErrorRspInfo(pRspInfo) {

		log.Printf("获取当前版本信息: %#v\n", goctp.CThostFtdcTraderApiGetApiVersion())
		log.Printf("获取当前交易日期: %#v\n", p.Client.MdApi.GetTradingDay())
		log.Printf("获取用户登录信息: %#v %#v %#v\n", pRspUserLogin.GetLoginTime(), pRspUserLogin.GetSystemName(), pRspUserLogin.GetSessionID())

		//ppInstrumentID := []string{"rb1710"}
		//
		//p.SubscribeMarketData(ppInstrumentID)
		//p.SubscribeForQuoteRsp(ppInstrumentID)
	}
}

func (p *GoCThostFtdcMdSpi) SubscribeMarketData(name []string) {

	iResult := p.Client.MdApi.SubscribeMarketData(name)

	if iResult != 0 {
		log.Println("发送行情订阅请求: 失败.")
	} else {
		log.Println("发送行情订阅请求: 成功.")
	}
}

func (p *GoCThostFtdcMdSpi) SubscribeForQuoteRsp(name []string) {

	iResult := p.Client.MdApi.SubscribeForQuoteRsp(name)

	if iResult != 0 {
		log.Println("发送询价订阅请求: 失败.")
	} else {
		log.Println("发送询价订阅请求: 成功.")
	}
}

func (p *GoCThostFtdcMdSpi) OnRspSubMarketData(pSpecificInstrument goctp.CThostFtdcSpecificInstrumentField, pRspInfo goctp.CThostFtdcRspInfoField, nRequestID int, bIsLast bool) {
	log.Printf("GoCThostFtdcMdSpi.OnRspSubMarketData: %#v %#v %#v\n", pSpecificInstrument.GetInstrumentID(), nRequestID, bIsLast)
	p.IsErrorRspInfo(pRspInfo)
}

func (p *GoCThostFtdcMdSpi) OnRspSubForQuoteRsp(pSpecificInstrument goctp.CThostFtdcSpecificInstrumentField, pRspInfo goctp.CThostFtdcRspInfoField, nRequestID int, bIsLast bool) {
	log.Printf("GoCThostFtdcMdSpi.OnRspSubForQuoteRsp: %#v %#v %#v\n", pSpecificInstrument.GetInstrumentID(), nRequestID, bIsLast)
	p.IsErrorRspInfo(pRspInfo)
}

func (p *GoCThostFtdcMdSpi) OnRspUnSubMarketData(pSpecificInstrument goctp.CThostFtdcSpecificInstrumentField, pRspInfo goctp.CThostFtdcRspInfoField, nRequestID int, bIsLast bool) {
	log.Printf("GoCThostFtdcMdSpi.OnRspUnSubMarketData: %#v %#v %#v\n", pSpecificInstrument.GetInstrumentID(), nRequestID, bIsLast)
	p.IsErrorRspInfo(pRspInfo)
}
func (p *GoCThostFtdcMdSpi) OnRspUnSubForQuoteRsp(pSpecificInstrument goctp.CThostFtdcSpecificInstrumentField, pRspInfo goctp.CThostFtdcRspInfoField, nRequestID int, bIsLast bool) {
	log.Printf("GoCThostFtdcMdSpi.OnRspUnSubForQuoteRsp: %#v %#v %#v\n", pSpecificInstrument.GetInstrumentID(), nRequestID, bIsLast)
	p.IsErrorRspInfo(pRspInfo)
}


func (p *GoCThostFtdcMdSpi) OnRtnDepthMarketData(pDepthMarketData goctp.CThostFtdcDepthMarketDataField) {
  //db, err := sql.Open("mysql", "root:123456@/mysql")
  //if err!= nil{
  //
  //	fmt.Println(err)
  //}

  // get tick
  tick.Symbol = pDepthMarketData.GetInstrumentID()
  tick.Exchange = pDepthMarketData.GetExchangeID()
  tick.VtSymbol = tick.Symbol

  tick.LastPrice = pDepthMarketData.GetLastPrice()
  tick.Volume = pDepthMarketData.GetVolume()
  tick.OpenInterest = pDepthMarketData.GetOpenInterest()
  tick.Time = strings.Join([]string{pDepthMarketData.GetUpdateTime(), strconv.Itoa(pDepthMarketData.GetUpdateMillisec() / 100)}, ".")

  tick.Date = strings.Join(strings.Split(time.Now().String(), "")[0:10], "")
  tick.OpenPrice = pDepthMarketData.GetOpenPrice()
  tick.HighPrice = pDepthMarketData.GetHighestPrice()
  tick.LowPrice = pDepthMarketData.GetLowestPrice()
  tick.PreClosePrice = pDepthMarketData.GetPreClosePrice()
  tick.UpperLimit = pDepthMarketData.GetUpperLimitPrice()
  tick.LowerLimit = pDepthMarketData.GetLowerLimitPrice()
  tick.BidPrice1 = pDepthMarketData.GetBidPrice1()
  tick.BidVolume1 = pDepthMarketData.GetBidVolume1()
  tick.AskPrice1 = pDepthMarketData.GetAskPrice1()
  tick.AskVolume1 = pDepthMarketData.GetAskVolume1()

  // save in Mysql

  //a,b := db.Exec(`INSERT INTO ctpticks(symbol,exchange,vtSymbol,lastPrice,volume,openInterest,ctptime,ctpdate,openPrice,highPrice,lowPrice,preClosePrice,upperLimit,lowerLimit,bidPrice1,bidVolume1,askPrice1,askVolume1) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,tick.symbol,
  //	tick.exchange,tick.vtSymbol,tick.lastPrice,tick.volume,tick.openInterest,tick.time,tick.date,
  //	tick.openPrice,tick.highPrice,tick.lowPrice,tick.preClosePrice,tick.upperLimit,tick.lowerLimit,
  //	tick.bidPrice1,tick.bidVolume1,tick.askPrice1,tick.askVolume1)
  //if a != nil{
  //	println("a:",a)
  //}
  //if b != nil{
  //	fmt.Println("b:",b)
  //}
  //defer db.Close()

  //log.Println("DATA",
  //  tick.Symbol,
  //  tick.Exchange,
  //  tick.VtSymbol,
  //  tick.LastPrice,
    //tick.volume,
    //tick.openInterest,
    //tick.time,
    //tick.date,
    //tick.openPrice,
    //tick.highPrice,
    //tick.lowPrice,
    //tick.preClosePrice,
    //tick.upperLimit,
    //tick.lowerLimit,
    //tick.bidPrice1,
    //tick.bidVolume1,
    //tick.askPrice1,

    //tick.askVolume1
    //)

  aa := Tick{
    Symbol: tick.Symbol,
    Exchange:tick.Exchange,
    VtSymbol:tick.VtSymbol,
    LastPrice:tick.LastPrice,
    Volume:tick.Volume,
    OpenInterest:tick.OpenInterest,
    Time:tick.Time,
    Date:tick.Date,
    OpenPrice:tick.OpenPrice,
    HighPrice:tick.HighPrice,
    LowPrice:tick.LowPrice,
    PreClosePrice:tick.PreClosePrice,
    UpperLimit:tick.UpperLimit,
    LowerLimit:tick.LowerLimit,
    BidPrice1:tick.BidPrice1,
    BidVolume1:tick.BidVolume1,
    AskPrice1:tick.AskPrice1,
    AskVolume1:tick.AskVolume1,
  }

  //bb := User{
  //  Func: "kk",
  //  Username: "ll",
  //  Password: "bb",
  //  NewPassword:"cc",
  //  Success: true,
  //  ErrorMessage: "l",
  //  Ls: "0000",
  //}

  fmt.Println("1")
  for client := range clients {

    err := client.WriteJSON(aa)

    fmt.Println("registger responed:",aa)
    break // 只发送一次
    if err != nil {
      log.Printf("error: %v", err)
      client.Close()
      delete(clients, client)
    }
  }
}

func (p *GoCThostFtdcMdSpi) OnRtnForQuoteRsp(pForQuoteRsp goctp.CThostFtdcForQuoteRspField) {
	log.Printf("GoCThostFtdcMdSpi.OnRtnForQuoteRsp: %#v\n", pForQuoteRsp)
}

func init() {
	log.SetFlags(log.LstdFlags)
	log.SetPrefix("CTP: ")

	CTP = GoCTPClient{
		BrokerID:   *broker_id,
		InvestorID: *investor_id,
		Password:   *pass_word,

		MdFront: *market_front,
		MdApi:   goctp.CThostFtdcMdApiCreateFtdcMdApi(),

		TraderFront: *trade_front,
		TraderApi:   goctp.CThostFtdcTraderApiCreateFtdcTraderApi(),

		MdRequestID:     0,
		TraderRequestID: 0,
	}

}
