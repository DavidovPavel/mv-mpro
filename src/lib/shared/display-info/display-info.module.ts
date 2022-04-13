import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StatusInfoComponent } from './status-info/status-info.component';
import { TypeInfoComponent } from './type-info/type-item.component';

@NgModule({
  declarations: [StatusInfoComponent, TypeInfoComponent],
  imports: [CommonModule],
  exports: [StatusInfoComponent, TypeInfoComponent],
})
export class DisplayInfoModule {}
