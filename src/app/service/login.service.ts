import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { ApiRoutes } from "../core/config/api-routes";
import { LoginBusinessModel } from "../business-model/login.business-model";
import { FormLoginModel } from "../model/form-login.model";

export const TOKEN_KEY = 'uponchart_token';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public postLogin(formLogin: FormLoginModel): Observable<LoginBusinessModel> {
    return this.http.post<LoginBusinessModel>(ApiRoutes.login, formLogin).pipe(
      map((loginBusinessModel: LoginBusinessModel) => {
        LoginService.setSession(loginBusinessModel);
        return loginBusinessModel;
      })
    );
  }

  private static setSession(loginBusinessModel: LoginBusinessModel): void {
    localStorage.setItem(TOKEN_KEY, loginBusinessModel.token);
  }
}
