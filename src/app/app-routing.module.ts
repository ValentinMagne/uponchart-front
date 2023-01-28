import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutingModule } from "./features/login/login-routing.module";
import { HomeRoutingModule } from "./features/home/home-routing.module";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => HomeRoutingModule,
      },
      {
        path: 'login',
        loadChildren: () => LoginRoutingModule,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
