import { Component } from '@angular/core';
import { RouteEnum } from "../../../core/enums/route.enum";
import { UserState } from "../../../core/user/user.state";
import { Observable } from "rxjs";
import { UserBusinessModel } from "../../../core/business/user.business-model";
import { Select } from "@ngxs/store";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public routes = RouteEnum;
  @Select(UserState.user) user$!: Observable<UserBusinessModel> | null;
}
