import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CodeInfo } from './../../../models/code-info';

export const MAIN_TYPE_CODE = '9';

@Component({
  selector: 'mpr-status-info',
  templateUrl: './status-info.component.html',
  styleUrls: ['./status-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusInfoComponent {
  @Input() row: CodeInfo;

  balanceInfo(balance: number): string {
    return balance !== null ? ' на сумму ' + Math.floor(balance / 100).toLocaleString() + ' руб.' : '';
  }

  isManTypeCode(code: string): boolean {
    return code.substr(6, 1) === MAIN_TYPE_CODE;
  }
}
