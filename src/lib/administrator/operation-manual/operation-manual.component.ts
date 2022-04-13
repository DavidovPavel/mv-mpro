import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ErrorCode } from '../../models/error-code';
import { CodeModel, ManualOperationModel } from './../../models/request/manual-operation';
import { OperationService } from './../../services/operation.service';

@Component({
  selector: 'mpr-operation-manual',
  templateUrl: './operation-manual.component.html',
  styleUrls: ['./operation-manual.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationManualComponent implements OnInit {
  form = this.fb.group({
    items: [''],
    dateFrom: [''],
    dateTo: [''],
    status: [''],
    used: [''],
    prolongated: [''],
    blocked: [''],
    wareCode: [''],
    poolName: [''],
    notes: [''],
    goodsGroupCode: [''],
    goodsCode: [''],
    brandCode: [''],
    objectCode: [''],
    comment: ['', Validators.required],
    balance: ['', [Validators.pattern(new RegExp(/^[0-9]+$/))]],
    discount: ['', [Validators.pattern(new RegExp(/^[0-9]+$/))]],
    activationDiscount: ['', [Validators.pattern(new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/)), Validators.min(0), Validators.max(99)]],
    count: ['', [Validators.pattern(new RegExp(/^[0-9]+$/))]],
    orderNumber: ['', [Validators.pattern(new RegExp(/^[0-9]+$/))]],
  });

  currencySymbol = getCurrencySymbol('RUB', 'narrow');

  result$: Observable<ErrorCode[]>;

  @ViewChild('confirm', { read: TemplateRef }) confirmTemplate: TemplateRef<unknown>;

  constructor(
    private fb: FormBuilder,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private route: ActivatedRoute,
    private service: OperationService
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Ручные операции с ПК или ВПС', back: { url: '../../', route: this.route } });
  }

  change(): void {
    if (this.form.valid) {
      const value = this.form.value;
      const { items } = value;
      const count = items.length;

      if (this.service.asArray(items) && count) {
        const request = Object.keys(value)
          .filter(key => value[key] !== '')
          .reduce((p, c) => ({ ...p, [c]: value[c] }), { comment: '' });

        const packets: ManualOperationModel[] = items
          .map(code => ({ code }))
          .reduce<CodeModel[][]>(this.service.groupByPacket(), [])
          .map(codes => ({ ...request, items: codes }));

        this.result$ = this.service
          .showDialogAndClosed(this.confirmTemplate, { count })
          .pipe(switchMap(() => this.service.getResult(packets, 'card/manual')));
      }
    } else {
      Object.keys(this.form.controls).forEach(key => this.form.get(key).markAsTouched());
    }
  }

  toggleClass(isNull: boolean, field: MatFormField): void {
    const el = field._elementRef.nativeElement as HTMLElement;
    if (isNull) {
      el.classList.add('disabled-field');
    } else {
      el.classList.remove('disabled-field');
    }
  }

  hasError(name: string, validator: string) {
    return this.form.get(name).hasError(validator);
  }
}
