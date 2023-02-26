import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SpinnerComponent } from "../components/spinner/spinner.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ErrorComponent } from "../components/error/error.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [
    SpinnerComponent,
    ErrorComponent
  ]
})
export class ComponentsModule {
}
