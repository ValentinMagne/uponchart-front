import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutingModule } from "./features/login/login-routing.module";
import { HomeRoutingModule } from "./features/home/home-routing.module";
import { AuthGuard } from "./core/guards/auth.guard";
import { AccountRoutingModule } from "./features/account/account-routing.module";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => HomeRoutingModule,
      },
      {
        path: 'account',
        loadChildren: () => AccountRoutingModule
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => LoginRoutingModule,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
