import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { SellerFundsSummaryComponent } from './seller-funds-summary/seller-funds-summary.component';
import { ComponentsModule } from '../../core/modules/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    SellerFundsSummaryComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    ComponentsModule,
    TranslateModule
  ]
})
export class HomeModule {
}
