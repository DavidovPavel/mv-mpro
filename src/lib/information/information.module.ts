import { NgxPermissionsModule } from 'ngx-permissions';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { PaymentInstrumentsModule } from '../shared/payment-instruments/payment-instruments.module';
import { DisplayInfoModule } from './../shared/display-info/display-info.module';
import { HistoryComponent } from './history/history.component';
import { InformationRoutingModule } from './information-routing.module';
import { InfoComponent } from './information.component';

const MatModules = [
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatIconModule,
  MatSelectModule,
];

@NgModule({
  declarations: [InfoComponent, HistoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InformationRoutingModule,
    PaymentInstrumentsModule,
    DisplayInfoModule,
    FlexLayoutModule,
    ...MatModules,
    NgxPermissionsModule
  ],
})
export class InformationModule {}
