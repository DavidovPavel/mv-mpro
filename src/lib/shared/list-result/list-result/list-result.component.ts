import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ErrorCode } from '../../../models/error-code';

@Component({
  selector: 'mpr-list-result',
  templateUrl: './list-result.component.html',
  styleUrls: ['./list-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListResultComponent {
  @Input() result!: ErrorCode[];
}
