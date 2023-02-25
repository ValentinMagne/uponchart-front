import { Injectable, NgZone } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthStateModel } from "./auth-state-model";
import { Login } from "./login";
import { tap } from "rxjs";
import { Logout } from "./logout";
import { AuthService, TOKEN_KEY } from "../services/auth.service";
import { Router } from "@angular/router";
import { LoginBusinessModel } from "../business/login.business-model";
import { RouteEnum } from "../enums/route.enum";

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: LoginBusinessModel) => {
        ctx.patchState({
          token: result.token,
          username: action.payload.login
        });
        this.ngZone.run(() => {
          this.router.navigate([RouteEnum.HOME]);
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      username: null
    });
    localStorage.removeItem(TOKEN_KEY);
  }
}
