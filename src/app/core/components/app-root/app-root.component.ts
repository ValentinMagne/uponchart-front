import { Component, OnInit } from '@angular/core';
import { Actions, ofActionDispatched } from "@ngxs/store";
import { Router } from "@angular/router";
import { RouteEnum } from "../../enums/route.enum";
import { TranslateService } from "@ngx-translate/core";
import { Logout } from "../../states/auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {

  constructor(public translateService: TranslateService,
              private actions: Actions,
              private router: Router) {
  }

  public ngOnInit() {
    this.translateService.use("fr");
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate([RouteEnum.LOGIN]);
    });
  }
}
