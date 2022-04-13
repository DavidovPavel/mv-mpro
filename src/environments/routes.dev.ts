import { Routes } from '@angular/router';

export const extraRoutes: Routes = [{
  path: 'mprocessing',
  loadChildren: () => import('@sew/mprocessing-feature').then(m => m.MprocessingModule),
}];
