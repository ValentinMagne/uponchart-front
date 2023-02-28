import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Actions, ofActionDispatched, Select, Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { Logout } from "../../auth/logout";
import { RouteEnum } from "../../enums/route.enum";
import { Observable } from "rxjs";
import { AuthState } from "../../auth/auth-state";
import { UserState } from "../../user/user.state";
import { UserBusinessModel } from "../../business/user.business-model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {
  public routes = RouteEnum;
  public lightTheme = true;
  @Select(UserState.user) user$!: Observable<UserBusinessModel> | null;
  @Select(AuthState.isAuthenticated) isAuthenticated$!: Observable<boolean>;

  constructor(public translateService: TranslateService,
              private authService: AuthService,
              private store: Store,
              private actions: Actions,
              private router: Router) {
  }

  public ngOnInit() {
    this.translateService.use("fr");
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate([RouteEnum.LOGIN]);
    });
  }

  public logout(): void {
    this.store.dispatch(Logout);
  }

  public toggleTheme(): void {
    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("dark-theme");
    this.lightTheme = !this.lightTheme;
  }

  public toggleLanguage(): void {
    this.translateService.use(this.translateService.currentLang === "fr" ? "en" : "fr");
  }
}
