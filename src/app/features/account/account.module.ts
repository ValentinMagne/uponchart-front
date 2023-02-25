import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileComponent } from "./profile/profile.component";
import { AccountRoutingModule } from "./account-routing.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatButtonModule
  ]
})
export class AccountModule {
}
