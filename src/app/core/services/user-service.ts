import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiRoutes } from "../config/api-routes";
import { UserBusinessModel } from "../business/user.business-model";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<UserBusinessModel[]> {
    return this.http.get<UserBusinessModel[]>(ApiRoutes.users);
  }
}
