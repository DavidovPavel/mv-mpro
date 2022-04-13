import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PaymentInstrumentsModule } from '../shared/payment-instruments/payment-instruments.module';
import { ListResultModule } from './../shared/list-result/list-result.module';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { OperationManualComponent } from './operation-manual/operation-manual.component';
import { ResetValueFieldComponent } from './reset-value-field/reset-value-field.component';
import { CardsGenerationComponent } from './cards-generation/cards-generation.component';

@NgModule({
  declarations: [OperationManualComponent, ResetValueFieldComponent, CardsGenerationComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PaymentInstrumentsModule,
    ListResultModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
})
export class AdministratorModule {}
