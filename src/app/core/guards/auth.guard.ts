import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../auth/auth-state";
import { catchError, map, Observable, of } from "rxjs";
import { RouteEnum } from "../enums/route.enum";
import { FetchUserAction } from "../user/fetch-user.action";
import { UserStateModel } from "../user/user.state-model";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  public canActivate(): Observable<boolean> {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate([RouteEnum.LOGIN]);
      return of(false);
    } else {
      return this.store.dispatch(FetchUserAction).pipe(
        map((state: { user: UserStateModel | null }) => {
          if (state.user?.user?.consented) {
            return true;
          } else {
            this.router.navigate([RouteEnum.CONSENT]);
            return false;
          }
        }),
        catchError((err) => {
          this.router.navigate([RouteEnum.LOGIN]);
          throw err;
        })
      )
    }
  }
}
