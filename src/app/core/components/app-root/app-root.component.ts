import { Component, OnDestroy } from '@angular/core';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnDestroy {
  public title = 'uponchart-front';

  constructor(private loginService: LoginService) {
  }

  public ngOnDestroy(): void {
    this.loginService.removeSession();
  }
}
