import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { MprPermissions } from '../permissions';
import { AddContractorComponent } from './add-contractor/add-contractor.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ContractorComponent } from './contractor/contractor.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { OrderActivationComponent } from './order-activation/order-activation.component';
import { OrderBlockingComponent } from './order-blocking/order-blocking.component';
import { OrderDownloadComponent } from './order-download/order-download.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'contractors',
    component: ContractorsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CorpCustomers,
      },
    },
  },
  { path: 'contractors/add', component: AddContractorComponent },
  {
    path: 'contractors/:id',
    component: ContractorComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CorpCustomersEdit,
      },
    },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CorpOrders,
      },
    },
  },
  { path: 'orders/add', component: AddOrderComponent },
  {
    path: 'orders/:id',
    component: OrderComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CorpOrdersEdit,
      },
    },
  },
  {
    path: 'orders/:id/download',
    component: OrderDownloadComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CorpOrdersDownload,
      },
    },
  },
  {
    path: 'orders/:id/activation',
    component: OrderActivationComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CorpOrdersActivate,
      },
    },
  },
  {
    path: 'orders/:id/blocking',
    component: OrderBlockingComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CorpOrdersBlock,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporateRoutingModule {}
