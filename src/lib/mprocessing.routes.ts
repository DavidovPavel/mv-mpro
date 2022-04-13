import { Route } from '@angular/router';

import { MainComponent } from './main/main.component';
import { MprocessingComponent } from './mprocessing.component';

export const mprocessingRoutes: Route[] = [
  {
    path: '',
    component: MprocessingComponent,
    children: [
      { path: '', component: MainComponent },
      {
        path: 'information',
        loadChildren: () => import('./information/information.module').then(m => m.InformationModule),
      },
      {
        path: 'operation',
        loadChildren: () => import('./operation/operation.module').then(m => m.OperationModule),
      },
      {
        path: 'administrator',
        loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule),
      },
      {
        path: 'corporate',
        loadChildren: () => import('./corporate/corporate.module').then(m => m.CorporateModule),
      },
    ],
  },
];
