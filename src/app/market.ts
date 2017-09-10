export class Market{
  // 代码相关
  Symbol: string
  Exchange: string
  VtSymbol: string

  //　成交数据
  LastPrice:string
  LastVolume:string
  Volume:	string
  OpenInterest: string
  Time: string
  Date: string
  Datetaime:string

  //　常规行情
  OpenPrice: string
  HighPrice: string
  LowPrice: string
  PreClosePrice:string
  UpperLimit:	string
  LowerLimit:	string

  //　五档行情（ctp只有一档）
  BidPrice1:string
  AskPrice1: string
  BidVolume1: string
  AskVolume1:	string

}

