import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';

import { MprPermissions } from '../permissions';

@Component({
  selector: 'mpr-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  permissions = MprPermissions;
  /**
   * меню например в courier-handover
   */

  constructor(@Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: '' });
  }
}
