import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { ConsentComponent } from "./consent/consent.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'consent',
    component: ConsentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
