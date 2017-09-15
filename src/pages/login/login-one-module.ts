import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginOnePage } from './login-one';
import { UserService } from "../../app/user.service";

@NgModule({
  declarations: [
    LoginOnePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginOnePage),
  ],
  providers:[ UserService ]
})
export class LoginOnePageModule {}
