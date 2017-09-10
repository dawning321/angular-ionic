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
//import { UserService} from "./user.service";
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
    IonicModule.forRoot(MyApp)
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
