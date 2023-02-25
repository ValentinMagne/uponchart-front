import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './core/components/app-root/app-root.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { LoginModule } from "./features/login/login.module";
import { NgxsModule } from "@ngxs/store";
import { environment } from "../environments/environment";
import { AuthState } from "./core/auth/auth-state";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { HomeModule } from "./features/home/home.module";
import { TOKEN_KEY } from "./core/services/auth.service";
import { UserState } from "./core/user/user.state";
import { AccountModule } from "./features/account/account.module";

@NgModule({
  declarations: [
    AppRootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    AccountModule,
    NgxsModule.forRoot([AuthState, UserState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: TOKEN_KEY
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {
}
