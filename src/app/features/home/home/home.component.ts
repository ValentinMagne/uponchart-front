import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Logout } from "../../../core/auth/logout";
import { UserState } from "../../../core/user/user.state";
import { Observable } from "rxjs";
import { UserBusinessModel } from "../../../core/business/user.business-model";
import { RouteEnum } from "../../../core/enums/route.enum";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public routes = RouteEnum;
  @Select(UserState.user) user$!: Observable<UserBusinessModel | null>;

  constructor(private store: Store) {
    this.store = store;
  }

  public logout(): void {
    this.store.dispatch(Logout);
  }
}
