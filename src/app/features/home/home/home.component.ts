import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Logout } from "../../../core/auth/logout";
import { UserState } from "../../../core/user/user.state";
import { Observable } from "rxjs";
import { UserBusinessModel } from "../../../core/business/user.business-model";
import { Router } from "@angular/router";
import { RouteEnum } from "../../../core/enums/route.enum";
import { AuthState } from "../../../core/auth/auth-state";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @Select(UserState.user) user$!: Observable<UserBusinessModel | null>;

  constructor(private store: Store, private router: Router) {
    this.store = store;
  }

  public ngOnInit(): void {
    const isAuthenticated: boolean = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate([RouteEnum.LOGIN]);
    }
  }

  public logout(): void {
    this.store.dispatch(Logout);
  }
}
