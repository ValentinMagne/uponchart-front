import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../core/services/user-service";
import { AuthService } from "../../../core/services/auth.service";
import { FormLoginModel } from "../../../core/models/form-login.model";
import { Select, Store } from "@ngxs/store";
import { Login } from "../../../core/auth/login";
import { Observable } from "rxjs";
import { AuthState } from "../../../core/auth/auth-state";

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
      login: new FormControl("admin@uponchart.com", [Validators.required]),
      password: new FormControl("uponchart", [Validators.required])
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) return;
    this.store.dispatch(new Login(this.form.value as FormLoginModel));
  }
}
