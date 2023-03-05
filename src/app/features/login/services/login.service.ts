import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiRoutes } from '../../../core/config/api-routes';
import { AuthBusinessModel } from '../../../core/business/auth-business.model';
import { LoginFormModel } from '../models/login-form.model';
import { SKIP_AUTH_BEARER } from '../../../core/interceptors/auth.interceptor';
import { RegisterFormModel } from '../models/register-form.model';

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public login(loginFormModel: LoginFormModel): Observable<AuthBusinessModel> {
    return this.http.post<AuthBusinessModel>(ApiRoutes.login, loginFormModel,
      {context: new HttpContext().set(SKIP_AUTH_BEARER, true)});
  }

  public register(registerFormModel: RegisterFormModel): Observable<AuthBusinessModel> {
    return this.http.post<AuthBusinessModel>(ApiRoutes.register, registerFormModel,
      {context: new HttpContext().set(SKIP_AUTH_BEARER, true)});
  }
}
