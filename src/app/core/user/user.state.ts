import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserStateModel } from "./user.state-model";
import { UserService } from "../services/user-service";
import { FetchUserAction } from "./fetch-user.action";
import { catchError, tap } from "rxjs";
import { UserBusinessModel } from "../business/user.business-model";
import { Logout } from "../auth/logout";

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

  constructor(private userService: UserService, private store: Store) {
  }

  @Action(FetchUserAction)
  fetchUser(ctx: StateContext<UserStateModel>) {
    return this.userService.getMe().pipe(
      tap((user: UserBusinessModel) => {
        ctx.patchState({
          user
        })
      }),
      catchError((err) => {
        this.store.dispatch(Logout);
        throw err;
      })
    )
  }
}
