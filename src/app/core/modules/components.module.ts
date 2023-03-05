import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorComponent } from '../components/error/error.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    ErrorComponent,
    PieChartComponent,
    SpinnerComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
  ],
  exports: [
    ErrorComponent,
    PieChartComponent,
    SpinnerComponent,
    ToolbarComponent
  ]
})
export class ComponentsModule {
}
