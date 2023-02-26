import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { Logout } from "../auth/logout";

@Injectable()
export class JwtExpiredErrorHandler implements ErrorHandler {

  constructor(private store: Store) {
  }

  public handleError(error: HttpErrorResponse): void {
    if (error.status === 403) {
      this.store.dispatch(Logout);
    } else {
      throw error;
    }
  }
}
