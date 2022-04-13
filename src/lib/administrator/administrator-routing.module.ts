import { CardsGenerationComponent } from './cards-generation/cards-generation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { MprPermissions } from '../permissions';

import { OperationManualComponent } from './operation-manual/operation-manual.component';

const routes: Routes = [
  {
    path: 'operation-manual',
    component: OperationManualComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.ManualEdit
      }
    }
  },
  {
    path: 'cards-generation',
    component: CardsGenerationComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: MprPermissions.CardsGenerate
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
