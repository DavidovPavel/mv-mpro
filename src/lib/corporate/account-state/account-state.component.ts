import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ErrorCode } from '../../models/error-code';
import { ApiService } from '../../services/api.service';
import { MprPermissions } from './../../permissions';

@Component({
  selector: 'mpr-account-state',
  templateUrl: './account-state.component.html',
  styleUrls: ['./account-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountStateComponent {
  permissions = MprPermissions;
  currencySymbol = getCurrencySymbol('RUB', 'narrow');

  @Input() options: { customerId: number; forCard: boolean; label: string };
  @Input() balance: number;
  @Input() operations: string[];

  form = this.fb.group({
    operation: ['', Validators.required],
    value: ['', [Validators.required, Validators.pattern(new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/)), Validators.min(0)]],
  });

  result$: Observable<ErrorCode[]>;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  do(): void {
    if (this.form.valid) {
      const { customerId, forCard: balanceForCards } = this.options;
      const { operation, value } = this.form.value;
      const amount = parseFloat(value);
      const request = {
        customerId,
        amount: (operation === 1 ? amount : -amount) * 100,
        balanceForCards,
      };
      this.result$ = this.api.post<ErrorCode[]>('customer/change_balance_to', request).pipe(
        map(a => {
          if (this.isValidResult(a)) {
            this.balance = a.balanceEdited;
            return [];
          }
          return a;
        })
      );
    } else Object.keys(this.form.controls).forEach(key => this.form.get(key).markAsTouched());
  }

  isValidResult(a: unknown): a is { balanceEdited: number } {
    return a && typeof a === 'object' && 'balanceEdited' in a;
  }

  hasError(name: string, validator: string) {
    return this.form.get(name).hasError(validator);
  }
}
