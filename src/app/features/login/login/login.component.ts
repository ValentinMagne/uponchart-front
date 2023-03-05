import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user-service';
import { AuthService } from '../../../core/services/auth.service';
import { FormLoginModel } from '../../../core/models/form-login.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../core/states/auth/auth-state';
import { Login } from '../../../core/states/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  @Select(AuthState.hasError) hasError$!: Observable<boolean>;
  @Select(AuthState.isLoading) isLoading$!: Observable<boolean>;

  constructor(private userService: UserService,
              private loginService: AuthService,
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
    this.store.dispatch(new Login(this.form.value as FormLoginModel));
  }
}
