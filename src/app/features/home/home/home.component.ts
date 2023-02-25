import { Component } from "@angular/core";
import { Select } from "@ngxs/store";
import { UserState } from "../../../core/user/user.state";
import { Observable } from "rxjs";
import { UserBusinessModel } from "../../../core/business/user.business-model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  @Select(UserState.user) user$!: Observable<UserBusinessModel | null>;
}
