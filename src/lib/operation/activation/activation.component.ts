import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DictItem } from '../../models/dict-item';
import { ActivationItem, ActivationModel } from '../../models/request/activation';
import { OperationService } from '../../services/operation.service';
import { ErrorCode } from './../../models/error-code';

@Component({
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivationComponent implements OnInit {
  form = this.fb.group({
    codes: ['', Validators.required],
    comment: [],
    amount: ['', Validators.required],
    customerId: [],
    activationDiscount: ['', [Validators.pattern(new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/)), Validators.min(0), Validators.max(99)]],
  });

  currencySymbol = getCurrencySymbol('RUB', 'narrow');
  customers$: Observable<DictItem[]>;
  result$: Observable<ErrorCode[]>;

  @ViewChild('confirm', { read: TemplateRef }) confirmTemplate: TemplateRef<unknown>;

  constructor(
    private fb: FormBuilder,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private service: OperationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Активация ПК', back: { url: '../../', route: this.route } });
    this.customers$ = this.service.getDictionaryCustomer();
  }

  submit(): void {
    if (this.form.valid) {
      const { comment, codes, amount } = this.form.value;
      if (this.service.asArray(codes) && this.service.asArray(amount)) {
        const packets: ActivationModel[] = codes
          .map((code: string, i: number) => this.getActivationItem(code, +amount[i]))
          .reduce<ActivationItem[][]>(this.service.groupByPacket(), [])
          .map(items => ({ comment, items }));

        const count = codes.length;
        const allAmount = amount.reduce((sum, arg) => (!isNaN(+arg) ? +arg + sum : sum), 0);

        if (count > 0) {
          this.result$ = this.service
            .showDialogAndClosed(this.confirmTemplate, { count, allAmount })
            .pipe(switchMap(() => this.service.getResult(packets, 'card/activation')));
        }
      }
    }
  }

  getActivationItem(code: string, amount: number): ActivationItem {
    const { customerId, activationDiscount } = this.form.value;
    return {
      code,
      amount,
      customerId: +customerId,
      activationDiscount: +activationDiscount,
    };
  }

  hasError(name: string, validator: string) {
    return this.form.get(name).hasError(validator);
  }
}
