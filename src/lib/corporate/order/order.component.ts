import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { Contractor } from '../../models/contractor';
import { ErrorCode } from '../../models/error-code';
import { Order } from '../../models/order';
import { MprPermissions } from '../../permissions';
import { ApiService } from '../../services/api.service';
import { ConfirmDialogComponent } from '../../shared/mpr-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'mpr-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit, OnDestroy {
  permissions = MprPermissions;
  order$: Observable<Order>;

  form = this.fb.group({});

  customer$: Observable<Contractor[]>;
  result$: Observable<ErrorCode[]>;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Изменение корпоративного заказа', back: { url: '../', route: this.route } });

    this.order$ = this.route.paramMap.pipe(
      switchMap(p =>
        this.api
          .post<Order>('order', { orderId: +p.get('id') })
          .pipe(
            tap(a => {
              Object.keys(a).forEach(k => this.form.addControl(k, this.fb.control(a[k])));
              this.paymentDataProcessing();
            })
          )
      )
    );

    this.customer$ = this.api.post('customers/find', { type: 1, status: 0 });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(): void {
    if (this.form.valid) {
      const request = this.form.value;
      this.result$ = this.api.post<ErrorCode[]>('order/edit', request).pipe(
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

  remove(orderId: number): void {
    const request = { orderId };
    this.result$ = this.dialog
      .open(ConfirmDialogComponent, {
        width: '450px',
      })
      .afterClosed()
      .pipe(
        filter(a => a),
        switchMap(() =>
          this.api.post<ErrorCode[]>('order/delete', request).pipe(
            tap(a => {
              if (a === null) {
                this.cancel();
              }
            })
          )
        )
      );
  }

  cancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
