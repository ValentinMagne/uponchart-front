import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../states/auth/auth-state";
import { catchError, map, Observable, of } from "rxjs";
import { RouteEnum } from "../enums/route.enum";
import { FetchUser } from "../states/user/fetch-user";
import { UserStateModel } from "../states/user/user.state-model";
import { SnackBarService } from "../services/snack-bar.service";
import { Logout } from "../states/auth/auth.actions";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private store: Store,
              private router: Router,
              private snackBarService: SnackBarService) {
  }

  public canActivate(): Observable<boolean> {
    const isAuthenticated = this.store.selectSnapshot(AuthState.hasToken);
    if (!isAuthenticated) {
      this.router.navigate([RouteEnum.LOGIN]);
      return of(false);
    } else {
      return this.store.dispatch(FetchUser).pipe(
        map((state: { user: UserStateModel | null }) => {
          if (state.user?.user?.consented) {
            return true;
          } else {
            this.router.navigate([RouteEnum.CONSENT]);
            return false;
          }
        }),
        catchError((err) => {
          this.snackBarService.openSnackBar("Veuillez vous reconnecter", "🔒");
          this.store.dispatch(Logout);
          throw err;
        })
      )
    }
  }
}
