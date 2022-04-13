import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { merge, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Contractor } from '../../models/contractor';
import { ErrorCode } from '../../models/error-code';
import { ApiService } from '../../services/api.service';

const IMG_ID = 22;

export interface ExtraNominal {
  nominal: number;
  quantity: number;
}

@Component({
  selector: 'mpr-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent implements OnInit, OnDestroy {
  currencySymbol = getCurrencySymbol('RUB', 'narrow');

  form = this.fb.group({
    customerId: [],
    orderStatus: [0],
    emissionId: [22],
    imageId: [272],
    paymentDate: [null],
    discount: [0],
    deliveryMethod: [0],
    validPeriodStartDate: ['', Validators.required],
    archiveSize: [0],
    nominal: [500, Validators.min(1)],
    quantity: [1, Validators.min(1)],
  });

  customer$: Observable<Contractor[]>;
  images$: Observable<{ imageId: number; imageFileName: string }>;
  result$: Observable<ErrorCode[]>;

  subscription: Subscription;

  extraNominals: ExtraNominal[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Добавление корпоративного заказа', back: { url: '../', route: this.route } });
    this.customer$ = this.api.post('customers/find', { type: 1, status: 0 });
    this.images$ = this.api.post('emission/images', { emissionId: IMG_ID });
    this.paymentDataProcessing();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  paymentDataProcessing(): void {
    const paymentData = this.form.get('paymentDate');
    this.subscription = this.form.get('orderStatus').valueChanges.subscribe(v => {
      if (v === 0) {
        paymentData.setValue(null);
        paymentData.clearValidators();
        paymentData.updateValueAndValidity();
      } else {
        paymentData.setValidators(Validators.required);
      }
    });
  }

  save(): void {
    if (this.form.valid) {
      const request = this.form.value;
      const send = [this.api.post<ErrorCode[]>('order/add', request)];
      if (this.extraNominals.length) {
        send.push(...this.sendExtra());
      }
      this.result$ = merge(...send).pipe(
        tap(a => {
          if (a === null) {
            this.router.navigate(['../'], { relativeTo: this.route });
          }
        })
      );
    } else {
      Object.keys(this.form.controls).forEach(k => this.form.get(k).markAsTouched());
    }
  }

  sendExtra(): Observable<ErrorCode[]>[] {
    const send = [];
    this.extraNominals.forEach(e => {
      const request = { ...this.form.value };
      request.nominal = e.nominal;
      request.quantity = e.quantity;
      send.push(this.api.post<ErrorCode[]>('order/add', request));
    });
    return send;
  }

  changeNominal(items: ExtraNominal[]): void {
    this.extraNominals = items;
  }
}
