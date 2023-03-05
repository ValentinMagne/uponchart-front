import { Injectable, NgZone } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from './auth-state-model';
import { catchError, tap } from 'rxjs';
import { LoginService } from '../../../features/login/services/login.service';
import { Router } from '@angular/router';
import { AuthBusinessModel } from '../../business/auth-business.model';
import { RouteEnum } from '../../enums/route.enum';
import { FetchUser, Login, Logout, Register } from './auth.actions';
import { UserBusinessModel } from "../../business/user.business-model";
import { UserService } from "../../services/user-service";

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    token: null,
    username: null,
    isLoading: false,
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static user(state: AuthStateModel): UserBusinessModel | null {
    return state.user;
  }

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.username || !!state.user;
  }

  @Selector()
  static hasToken(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static username(state: AuthStateModel): string | null {
    return state.username || (state.user !== null ? state.user.login : null);
  }

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.isLoading;
  }

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router,
              private ngZone: NgZone) {
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({
      isLoading: true
    });
    return this.loginService.login(action.payload).pipe(
      tap((authBusinessModel: AuthBusinessModel) => {
        ctx.patchState({
          token: authBusinessModel.token,
          username: action.payload.login,
          isLoading: true // keep loading before routing to HOME
        });
        this.ngZone.run(() => {
          this.router.navigate([RouteEnum.HOME]);
        });
      }),
      catchError((error) => {
        ctx.setState({
          user: null,
          token: null,
          username: null,
          isLoading: false
        });
        throw error;
      })
    );
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    ctx.patchState({
      isLoading: true
    });
    return this.loginService.register(action.payload).pipe(
      tap((authBusinessModel: AuthBusinessModel) => {
        ctx.patchState({
          token: authBusinessModel.token,
          username: action.payload.login,
          isLoading: true // keep loading before routing to HOME
        });
        this.ngZone.run(() => {
          this.router.navigate([RouteEnum.HOME]);
        });
      }),
      catchError((error) => {
        ctx.setState({
          user: null,
          token: null,
          username: null,
          isLoading: false
        });
        throw error;
      })
    );
  }

  @Action(FetchUser)
  fetchUser(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isLoading: true
    });
    return this.userService.getMe().pipe(
      tap((user: UserBusinessModel) => {
        ctx.patchState({
          user,
          username: user.login,
          isLoading: false
        })
      }),
      catchError((err) => {
        ctx.setState({
          user: null,
          token: null,
          username: null,
          isLoading: false
        });
        throw err;
      })
    )
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      user: null,
      token: null,
      username: null,
      isLoading: false
    });
  }
}
