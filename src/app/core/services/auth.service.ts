import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ApiRoutes } from "../config/api-routes";
import { LoginBusinessModel } from "../business/login.business-model";
import { FormLoginModel } from "../models/form-login.model";
import { SKIP_AUTH_BEARER } from "../interceptors/auth.interceptor";

export const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(formLogin: FormLoginModel): Observable<LoginBusinessModel> {
    return this.http.post<LoginBusinessModel>(ApiRoutes.login, formLogin,
      {context: new HttpContext().set(SKIP_AUTH_BEARER, true)});
  }

  public logout(): Observable<boolean> {
    this.removeSession();
    return of(true);
  }

  public removeSession(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
