import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Actions, ofActionDispatched, Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { Logout } from "../../auth/logout";
import { AuthState } from "../../auth/auth-state";
import { FetchUserAction } from "../../user/fetch-user.action";
import { RouteEnum } from "../../enums/route.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {

  constructor(private authService: AuthService, private store: Store, private actions: Actions, private router: Router) {
  }

  public ngOnInit() {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate([RouteEnum.LOGIN]);
    });
    if (!this.store.selectSnapshot(AuthState.isAuthenticated)) {
      this.router.navigate([RouteEnum.LOGIN]);
    } else {
      this.store.dispatch(FetchUserAction);
    }
  }
}
