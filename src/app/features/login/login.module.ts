import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from "./login-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ConsentComponent } from "./consent/consent.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    LoginComponent,
    ConsentComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        TranslateModule
    ]
})
export class LoginModule {
}
