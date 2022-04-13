import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mpr-reset-value-field',
  templateUrl: './reset-value-field.component.html',
  styleUrls: ['./reset-value-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetValueFieldComponent {
  isNill = false;
  value: string | number;

  @Input() field: FormControl;
  @Output() isNull = new EventEmitter<boolean>();

  redo(): void {
    this.field.setValue(this.value);
    this.isNill = false;
    this.isNull.emit(this.isNill);
  }

  reset(): void {
    this.value = this.field.value;
    this.field.setValue(null);
    this.isNill = true;
    this.isNull.emit(this.isNill);
  }
}
