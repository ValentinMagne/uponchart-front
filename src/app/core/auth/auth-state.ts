import { Injectable, NgZone } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthStateModel } from "./auth-state-model";
import { Login } from "./login";
import { catchError, tap } from "rxjs";
import { Logout } from "./logout";
import { AuthService, TOKEN_KEY } from "../services/auth.service";
import { Router } from "@angular/router";
import { LoginBusinessModel } from "../business/login.business-model";
import { RouteEnum } from "../enums/route.enum";

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
    isLoading: false,
    hasError: false,
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

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static hasError(state: AuthStateModel): boolean {
    return state.hasError;
  }

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({
      isLoading: true,
      hasError: false
    });
    return this.authService.login(action.payload).pipe(
      tap((result: LoginBusinessModel) => {
        ctx.patchState({
          token: result.token,
          username: action.payload.login,
          isLoading: true, // keep loading before routing to HOME
          hasError: false
        });
        this.ngZone.run(() => {
          this.router.navigate([RouteEnum.HOME]);
        });
      }),
      catchError((error) => {
        ctx.patchState({
          isLoading: false,
          hasError: true
        });
        throw error;
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      username: null,
      isLoading: false,
      hasError: false
    });
    localStorage.removeItem(TOKEN_KEY);
  }
}
