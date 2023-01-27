import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "./service/user-service";
import { UserBusinessModel } from "./business-model/user.business-model";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from "./service/login.service";
import { FormLoginModel } from "./model/form-login.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'uponchart-front';
  public form!: FormGroup;

  constructor(private userService: UserService, private loginService: LoginService) {
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl("admin@uponchart.com", [Validators.required]),
      password: new FormControl("uponchart", [Validators.required])
    });
  }

  public ngOnDestroy(): void {
    this.loginService.removeSession();
  }

  public onSubmit(): void {
    if (!this.form.valid) return;
    this.loginService.postLogin(this.form.value as FormLoginModel).subscribe(() => {
      this.getUsers();
    });
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe((users: UserBusinessModel[]) => {
      console.warn(users);
    })
  }
}
