import { CancelingLastComponent } from './canceling-last/canceling-last.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { MprPermissions } from '../permissions';

import { ActivationComponent } from './activation/activation.component';
import { BlockingComponent } from './blocking/blocking.component';
import { OperatorInterfaceComponent } from './operator-interface/operator-interface.component';
import { ProlongationComponent } from './prolongation/prolongation.component';

const routes: Routes = [
  {
    path: 'activation',
    component: ActivationComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CardsActivation,
      },
    },
  },
  {
    path: 'blocking',
    component: BlockingComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CardsBlock,
      },
    },
  },
  {
    path: 'prolongation',
    component: ProlongationComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CardsProlongation,
      },
    },
  },
  {
    path: 'interface',
    component: OperatorInterfaceComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CcInterface,
      },
    },
  },
  {
    path: 'canceling',
    component: CancelingLastComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CancelingLast,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationRoutingModule {}
