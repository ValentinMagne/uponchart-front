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
import { AuthGuard } from "./core/guards/auth.guard";

@NgModule({
  declarations: [
    AppRootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    })
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {
}
