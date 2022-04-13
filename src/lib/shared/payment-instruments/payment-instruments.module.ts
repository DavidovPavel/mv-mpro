import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxPermissionsModule } from 'ngx-permissions';

import { PaymentAvailablesComponent } from './availables/availables.component';
import { ListControlComponent } from './list-control/list-control.component';

@NgModule({
  declarations: [PaymentAvailablesComponent, ListControlComponent],
  imports: [CommonModule, NgxPermissionsModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  exports: [PaymentAvailablesComponent, ListControlComponent],
})
export class PaymentInstrumentsModule {}
