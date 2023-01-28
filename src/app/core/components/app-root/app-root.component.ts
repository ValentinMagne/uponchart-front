import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Actions, ofActionDispatched, Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { Logout } from "../../auth/logout";
import { AuthState } from "../../auth/auth-state";

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit, OnDestroy {
  public title = 'uponchart-front';

  constructor(private loginService: AuthService, private store: Store, private actions: Actions, private router: Router) {
  }

  public ngOnInit() {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/login']);
    });
    if (!this.store.selectSnapshot(AuthState.isAuthenticated)) this.router.navigate(['login']);
  }


  public ngOnDestroy(): void {
    this.loginService.removeSession();
  }
}
