import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserStateModel } from "./user.state-model";
import { UserService } from "../../services/user-service";
import { FetchUser } from "./fetch-user";
import { catchError, tap } from "rxjs";
import { UserBusinessModel } from "../../business/user.business-model";

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

  constructor(private userService: UserService) {
  }

  @Action(FetchUser)
  fetchUser(ctx: StateContext<UserStateModel>) {
    return this.userService.getMe().pipe(
      tap((user: UserBusinessModel) => {
        ctx.patchState({
          user
        })
      }),
      catchError((err) => {
        throw err;
      })
    )
  }
}