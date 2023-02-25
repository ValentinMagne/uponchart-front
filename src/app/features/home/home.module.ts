import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home/home.component";
import { MatButtonModule } from "@angular/material/button";
import { SellerFundsSummaryComponent } from './seller-funds-summary/seller-funds-summary.component';

@NgModule({
  declarations: [
    HomeComponent,
    SellerFundsSummaryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule
  ]
})
export class HomeModule {
}
