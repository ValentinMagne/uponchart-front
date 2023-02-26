import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { SnackBarActionEnum } from "../enums/snack-bar-action.enum";

@Injectable({providedIn: 'root'})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackBar(message: string, action: string, onAction: SnackBarActionEnum = SnackBarActionEnum.NONE): void {
    const config: MatSnackBarConfig = {
      duration: 5000
    }
    const snackBarRef = this.snackBar.open(message, action, config);
    snackBarRef.onAction().subscribe(() => {
      if (onAction === SnackBarActionEnum.RELOAD) {
        window.location.reload();
      }
    })
  }

}
