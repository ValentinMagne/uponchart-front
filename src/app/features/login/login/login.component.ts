import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user-service';
import { LoginService } from '../services/login.service';
import { LoginFormModel } from '../models/login-form.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../core/states/auth/auth-state';
import { Login } from '../../../core/states/auth/auth.actions';
import { RouteEnum } from '../../../core/enums/route.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public routes = RouteEnum;
  @Select(AuthState.isLoading) isLoading$!: Observable<boolean>;

  constructor(private userService: UserService,
              private loginService: LoginService,
              private store: Store) {
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) return;
    this.login();
  }

  public demoLogin(user: string): void {
    this.form.controls['login'].setValue(`${user}@uponchart.com`);
    this.form.controls['password'].setValue('uponchart');
    this.login();
  }

  private login(): void {
    this.store.dispatch(new Login(this.form.value as LoginFormModel));
  }
}
