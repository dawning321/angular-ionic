package _example
import (
  "flag"
  "myApp/goctp"

  _ "github.com/go-sql-driver/mysql"

)


var (
  broker_id    = flag.String("BrokerID", "9999", "经纪公司编号,SimNow BrokerID统一为：9999")
  investor_id  = flag.String("InvestorID", "093858","交易用户代码")
  pass_word    = flag.String("Password", "kobekobe520", "交易用户密码")
  market_front = flag.String("MarketFront", "tcp://180.168.146.187:10031", "行情前置,SimNow的测试环境: tcp://180.168.146.187:10010")
  trade_front  = flag.String("TradeFront", "tcp://180.168.146.187:10030", "交易前置,SimNow的测试环境: tcp://180.168.146.187:10001")
)

var tick Tick
var CTP GoCTPClient

type Tick struct{

  // 代码相关
  Symbol 		string
  Exchange 	string
  VtSymbol	string

  //　成交数据
  LastPrice	float64
  LastVolume	string
  Volume		int
  OpenInterest float64
  Time 		string
  Date 		string
  Datetaime	string

  //　常规行情
  OpenPrice	float64
  HighPrice	float64
  LowPrice	float64
  PreClosePrice	float64
  UpperLimit	float64
  LowerLimit	float64

  //　五档行情（ctp只有一档）
  BidPrice1	float64
  AskPrice1	float64
  BidVolume1	int
  AskVolume1	int

}

type GoCTPClient struct {
  BrokerID   string
  InvestorID string
  Password   string

  MdFront string
  MdApi   goctp.CThostFtdcMdApi

  TraderFront string
  TraderApi   goctp.CThostFtdcTraderApi

  MdRequestID     int
  TraderRequestID int
}
