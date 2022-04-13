import { PreviousRouteService } from './services/previous-route.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { MatPaginatorIntlRuService } from '@sew/common';
import { FckNavTileModule } from '@sew/fck';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MainComponent } from './main/main.component';
import { MprocessingComponent } from './mprocessing.component';
import { mprocessingRoutes } from './mprocessing.routes';
import { ApiService } from './services/api.service';
import { BackendConfigService } from './services/backend-config.service';
import { OperationService } from './services/operation.service';
import { PreloaderService } from './services/preloader.service';
import { HideEmptyDirective } from './main/hide-empty.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mprocessingRoutes),
    NgxPermissionsModule.forChild(),
    FlexLayoutModule,
    MatListModule,
    FckNavTileModule,
    MatProgressBarModule,
  ],
  declarations: [MprocessingComponent, MainComponent, HideEmptyDirective],
  providers: [
    ApiService,
    BackendConfigService,
    PreloaderService,
    OperationService,
    PreviousRouteService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlRuService },
  ],
})
export class MprocessingModule {}
