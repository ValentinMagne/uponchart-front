import { Component } from '@angular/core';
import { RouteEnum } from "../../../core/enums/route.enum";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public routes = RouteEnum;
}
