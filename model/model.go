package model

import (
  "log"
  "strings"
  "time"


  //"github.com/hprose/hprose-golang/io"
  "github.com/jinzhu/gorm"
  // for db SQL
  _ "github.com/jinzhu/gorm/dialects/sqlite"


)

var (
  // DB Database
  DB     *gorm.DB
  dbType = "sqlite3"
  dbURL  = "../custom/data.db"
)

func init() {
  //该函数用于注册一个可序列化和反序列化的自定义结构体
  //io.Register((*User)(nil), "User", "json")

  var err error

  // 连接数据库
  DB, err = gorm.Open("sqlite3",  "./data.db")
  if err != nil {
    log.Printf("Connect to %v database error: %v\n", dbType, err)
    return
  }
  // 创建数据库
  DB.AutoMigrate(&User{})

  users := []User{}
  DB.Find(&users)
  if len(users) == 0 {
    admin := User{
      Username: "admin",
      Password: "123456",
    }
    // 创建用户
    if err := DB.Create(&admin).Error; err != nil {
      log.Fatalln("Create admin error:", err)
    }
  }
  DB.LogMode(false)
  go ping()
}

func ping() {
  for {
    if err := DB.Exec("SELECT 1").Error; err != nil {
      log.Println("Database ping error:", err)
      if DB, err = gorm.Open(strings.ToLower(dbType), dbURL); err != nil {
        log.Println("Retry connect to database error:", err)
      }
    }
    time.Sleep(time.Minute)
  }
}

// NewOrm ...
func NewOrm() (*gorm.DB, error) {
  return gorm.Open(strings.ToLower(dbType), dbURL)
}

