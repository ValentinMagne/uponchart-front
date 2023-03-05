import { Component, OnInit } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { RouteEnum } from "../../enums/route.enum";
import { Observable } from "rxjs";
import { AuthState } from "../../states/auth/auth-state";
import { TranslateService } from "@ngx-translate/core";
import { Logout } from "../../states/auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {
  public routes = RouteEnum;
  public lightTheme = true;
  @Select(AuthState.username) username$!: Observable<string> | null;

  constructor(public translateService: TranslateService,
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
    const body = document.getElementById("uponchart-body");
    body?.classList.toggle("dark-theme");
    this.lightTheme = !this.lightTheme;
  }

  public toggleLanguage(): void {
    this.translateService.use(this.translateService.currentLang === "fr" ? "en" : "fr");
  }
}
