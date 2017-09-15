import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRegisterPage } from './user-register';
import { UserService } from "../../app/user.service";

@NgModule({
  declarations: [
    UserRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRegisterPage),
  ],
  providers:[ UserService ]
})
export class UserRegisterPageModule {}
