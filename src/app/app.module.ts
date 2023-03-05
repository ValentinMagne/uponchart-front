import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './core/components/app-root/app-root.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoginModule } from './features/login/login.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AuthState } from './core/states/auth/auth-state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { HomeModule } from './features/home/home.module';
import { AccountModule } from './features/account/account.module';
import { MatIconModule } from '@angular/material/icon';
import { GlobalErrorHandler } from './core/handlers/global.error-handler';
import { SellerFundsSummaryState } from './features/home/states/seller-funds-summary.state';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { translationEn } from '../assets/i18n/translation-en';
import { translationFr } from '../assets/i18n/translation-fr';
import { ComponentsModule } from './core/modules/components.module';

@NgModule({
  declarations: [
    AppRootComponent
  ],
  imports: [
    AccountModule,
    AppRoutingModule,
    BrowserModule,
    ComponentsModule,
    HomeModule,
    LoginModule,
    MatIconModule,
    MatSnackBarModule,
    NgxsModule.forRoot([AuthState, SellerFundsSummaryState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setTranslation('en', translationEn, true);
    translate.setTranslation('fr', translationFr, true);
  }
}
