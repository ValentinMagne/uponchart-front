import { Component, OnInit } from '@angular/core';
import { UserService } from "./service/user-service";
import { UserBusinessModel } from "./business-model/user.business-model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'uponchart-front';

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.userService.getUsers().subscribe((users: UserBusinessModel[]) => {
      console.warn(users);
    })
  }
}
