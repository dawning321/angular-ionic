import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginOnePage} from "../pages/login/login-one";
import { UserRegisterPage } from '../pages/user-register/user-register';
import { FindPasswordPage } from "../pages/find-password/find-password";
import { HomePage } from "../pages/home/home";
import { ChangePasswordPage } from "../pages/change-password/change-password"
import { SubscriptMarketPage } from "../pages/subscript-market/subscript-market";
import { ShowDeptMarketPage} from "../pages/show-dept-market/show-dept-market";

@NgModule({
  declarations: [
    MyApp,
    LoginOnePage,
    UserRegisterPage,
    FindPasswordPage,
    HomePage,
    ChangePasswordPage,
    SubscriptMarketPage,
    ShowDeptMarketPage,
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{},
      {
      links:[
        {component:LoginOnePage,name:"LoginOnePage",segment:"login"},
        {component:UserRegisterPage,name:"UserRegisterPage",segment:"user-register"},
        {component:FindPasswordPage,name:"FindPasswordPage",segment:"find-password"},
        {component:HomePage,name:"HomePage",segment:"home"},
        {component:ChangePasswordPage,name:"ChangePasswordPage",segment:"change-password"},
        {component:SubscriptMarketPage,name:"SubscriptMarketPage",segment:"subscript-market"},
        {component:ShowDeptMarketPage,name:"ShowDeptMarketPage",segment:"show-dept-market"},
      ]
    })
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    LoginOnePage,
    UserRegisterPage,
    FindPasswordPage,
    HomePage,
    ChangePasswordPage,
    SubscriptMarketPage,
    ShowDeptMarketPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
