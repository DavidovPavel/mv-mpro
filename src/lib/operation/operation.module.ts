import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MprDialogModule } from '../shared/mpr-dialog/mpr-dialog.module';
import { PaymentInstrumentsModule } from '../shared/payment-instruments/payment-instruments.module';
import { DisplayInfoModule } from './../shared/display-info/display-info.module';
import { ListResultModule } from './../shared/list-result/list-result.module';
import { ActivationComponent } from './activation/activation.component';
import { BlockingComponent } from './blocking/blocking.component';
import { CancelingLastComponent } from './canceling-last/canceling-last.component';
import { OperationRoutingModule } from './operation-routing.module';
import { OperatorInterfaceComponent } from './operator-interface/operator-interface.component';
import { ProlongationComponent } from './prolongation/prolongation.component';

const MatModules = [
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
  MatSelectModule,
  MatDialogModule,
  MatDatepickerModule,
  MatCardModule,
];

@NgModule({
  declarations: [ActivationComponent, BlockingComponent, ProlongationComponent, OperatorInterfaceComponent, CancelingLastComponent],
  imports: [
    CommonModule,
    OperationRoutingModule,
    NgxPermissionsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PaymentInstrumentsModule,
    MprDialogModule,
    DisplayInfoModule,
    ListResultModule,
    ...MatModules,
  ]
})
export class OperationModule {}
