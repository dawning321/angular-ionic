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

@NgModule({
  declarations: [
    MyApp,
    LoginOnePage,
    UserRegisterPage,
    FindPasswordPage,
    HomePage,
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

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
