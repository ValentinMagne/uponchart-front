import { Injectable, NgZone } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from './auth-state-model';
import { catchError, tap } from 'rxjs';
import { LoginService } from '../../../features/login/services/login.service';
import { Router } from '@angular/router';
import { AuthBusinessModel } from '../../business/auth-business.model';
import { RouteEnum } from '../../enums/route.enum';
import { Login, Logout, Register } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
    isLoading: false,
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static hasToken(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static username(state: AuthStateModel): string | null {
    return state.username;
  }

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.isLoading;
  }

  constructor(private loginService: LoginService, private router: Router, private ngZone: NgZone) {
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
          token: null,
          username: null,
          isLoading: false
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
      isLoading: false
    });
  }
}
