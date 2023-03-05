import { Component } from '@angular/core';
import { RouteEnum } from '../../../core/enums/route.enum';
import { Observable } from 'rxjs';
import { UserBusinessModel } from '../../../core/business/user.business-model';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../core/states/auth/auth-state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public routes = RouteEnum;
  @Select(AuthState.user) user$!: Observable<UserBusinessModel> | null;
}
