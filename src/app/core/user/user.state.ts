import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserStateModel } from "./user.state-model";
import { UserService } from "../services/user-service";
import { FetchUserAction } from "./fetch-user.action";
import { catchError, map, take, tap, throwError } from "rxjs";
import { UserBusinessModel } from "../business/user.business-model";
import { Router } from "@angular/router";
import { RouteEnum } from "../enums/route.enum";

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
  }
})
@Injectable()
export class UserState {

  @Selector()
  static user(state: UserStateModel): UserBusinessModel | null {
    return state.user;
  }

  constructor(private userService: UserService, private router: Router) {
  }

  @Action(FetchUserAction)
  fetchUser(ctx: StateContext<UserStateModel>) {
    return this.userService.getMe().pipe(
      take(1),
      map((user: UserBusinessModel) => {
        if (!user.consented) {
          this.router.navigate([RouteEnum.CONSENT]);
        }
        return user;
      }),
      tap((user: UserBusinessModel) => {
        ctx.patchState({
          user
        })
      }),
      catchError((err) => {
        this.router.navigate([RouteEnum.LOGIN]);
        return throwError(err);
      })
    )
  }
}
