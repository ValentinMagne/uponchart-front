import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserBusinessModel } from "../business-model/user.business-model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<UserBusinessModel[]> {
    return this.http.get<UserBusinessModel[]>("https://uponchart.onrender.com/users");
  }
}
