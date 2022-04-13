import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { MprPermissions } from '../permissions';
import { HistoryComponent } from './history/history.component';
import { InfoComponent } from './information.component';

const routes: Routes = [
  {
    path: '',
    component: InfoComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CardsView
      }
    }
  },

  {
    path: ':code',
    component: InfoComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CardsView
      }
    }
  },

  {
    path: 'history/:code',
    component: HistoryComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.TransacHistoryView,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
