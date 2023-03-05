import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { SnackBarService } from "../services/snack-bar.service";
import { SnackBarActionEnum } from "../enums/snack-bar-action.enum";
import { Logout } from "../states/auth/auth.actions";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private store: Store, private snackBarService: SnackBarService) {
  }

  public handleError(error: HttpErrorResponse): void {
    if (error.status === 403) {
      this.store.dispatch(Logout);
    } else {
      this.snackBarService.openSnackBar("Une erreur est survenue", "Réessayer", SnackBarActionEnum.RELOAD);
      throw error;
    }
  }
}
