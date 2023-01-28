import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../core/services/user-service";
import { LoginService } from "../../../core/services/login.service";
import { FormLoginModel } from "../../../core/models/form-login.model";
import { UserBusinessModel } from "../../../core/business/user.business-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  constructor(private userService: UserService, private loginService: LoginService) {
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl("admin@uponchart.com", [Validators.required]),
      password: new FormControl("uponchart", [Validators.required])
    });
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
