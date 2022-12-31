import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiRoutes } from "../core/config/api-routes";
import { UserBusinessModel } from "../business-model/user.business-model";

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
