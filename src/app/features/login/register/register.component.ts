import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Register } from '../../../core/states/auth/auth.actions';
import { RegisterFormModel } from '../models/register-form.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '../../../core/states/auth/auth-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  @Select(AuthState.isLoading) isLoading$!: Observable<boolean>;

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) return;
    this.store.dispatch(new Register(this.form.value as RegisterFormModel));
  }
}
