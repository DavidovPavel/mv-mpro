import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MprDialogModule } from '../shared/mpr-dialog/mpr-dialog.module';
import { ListResultModule } from './../shared/list-result/list-result.module';
import { AccountStateComponent } from './account-state/account-state.component';
import { AddContractorComponent } from './add-contractor/add-contractor.component';
import { AddNominalOrderComponent } from './add-nominal-order/add-nominal-order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ContractorComponent } from './contractor/contractor.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { CorporateRoutingModule } from './corporate-routing.module';
import { OrderActivationComponent } from './order-activation/order-activation.component';
import { OrderBlockingComponent } from './order-blocking/order-blocking.component';
import { OrderDownloadComponent } from './order-download/order-download.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderComponent } from './order/order.component';
import { CostPipe } from './orders/cost.pipe';
import { OrdersComponent } from './orders/orders.component';
import { OrderCertificateComponent } from './order-certificate/order-certificate.component';

@NgModule({
  declarations: [
    ContractorsComponent,
    AddContractorComponent,
    ContractorComponent,
    AccountStateComponent,
    OrdersComponent,
    CostPipe,
    OrderStatusComponent,
    AddOrderComponent,
    OrderComponent,
    AddNominalOrderComponent,
    OrderDownloadComponent,
    OrderActivationComponent,
    OrderBlockingComponent,
    OrderCertificateComponent,
  ],
  imports: [
    CommonModule,
    CorporateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ListResultModule,
    MprDialogModule,
    NgxPermissionsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatCardModule,
  ],
})
export class CorporateModule {}
