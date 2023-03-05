import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../states/auth/auth-state';
import { Observable } from 'rxjs';
import { RouteEnum } from '../../enums/route.enum';
import { TranslateService } from '@ngx-translate/core';
import { Logout } from '../../states/auth/auth.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  public routes = RouteEnum;
  public lightTheme = true;
  @Select(AuthState.username) username$!: Observable<string> | null;
  @Select(AuthState.isAuthenticated) isAuthenticated$!: Observable<boolean>;

  constructor(public translateService: TranslateService,
              private store: Store) {
  }

  public logout(): void {
    this.store.dispatch(Logout);
  }

  public toggleTheme(): void {
    const body = document.getElementById('uponchart-body');
    body?.classList.toggle('dark-theme');
    this.lightTheme = !this.lightTheme;
  }

  public toggleLanguage(): void {
    this.translateService.use(this.translateService.currentLang === 'fr' ? 'en' : 'fr');
  }
}
