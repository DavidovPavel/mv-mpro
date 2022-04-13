import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { Contractor, ContractorEditModel } from '../../models/contractor';
import { ErrorCode } from '../../models/error-code';
import { ApiService } from '../../services/api.service';
import { ConfirmDialogComponent } from '../../shared/mpr-dialog/confirm-dialog/confirm-dialog.component';
import { MprPermissions } from './../../permissions';

@Component({
  selector: 'mpr-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractorComponent implements OnInit {
  permissions = MprPermissions;
  currencySymbol = getCurrencySymbol('RUB', 'narrow');

  form = this.fb.group({});

  customer$: Observable<ContractorEditModel>;
  result$: Observable<ErrorCode[]>;

  customerId: number;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({
      name: 'Изменение агента/клиента',
      back: { url: '../', route: this.route },
    });
    this.customer$ = this.route.paramMap.pipe(
      tap(p => (this.customerId = +p.get('id'))),
      switchMap(p =>
        this.api
          .post<ContractorEditModel>('customer', { customerId: +p.get('id') })
          .pipe(tap(a => this.fillForm(a)))
      )
    );
  }

  fillForm(data: Contractor): void {
    Object.keys(data).forEach(key => {
      const validators = this.getValidators(key);
      const value = this.checkValue(data, key);
      this.form.addControl(key, this.fb.control(value, validators));
    });
    this.form.addControl('customerId', this.fb.control(this.customerId));
  }

  getValidators(key: string): ValidatorFn[] {
    const data: { [key: string]: ValidatorFn[] } = {
      shortCompanyName: [Validators.required],
      inn: [Validators.required],
      overdraft: [
        Validators.required,
        Validators.pattern(new RegExp(/^[0-9]+$/)),
        Validators.min(0),
      ],
      customerDiscount: [
        Validators.pattern(new RegExp(/^[0-9]+$/)),
        Validators.min(0),
        Validators.max(100),
      ],
      customerDiscountForCards: [
        Validators.pattern(new RegExp(/^[0-9]+$/)),
        Validators.min(0),
        Validators.max(100),
      ],
    };
    return data[key] ?? [];
  }

  checkValue(data: Contractor, key: string): string | number {
    return key === 'overdraft' ? +data[key] / 100 : data[key];
  }

  save(): void {
    if (this.form.valid) {
      const request = this.form.value;
      this.convertToRub(request);
      this.result$ = this.api.post<ErrorCode[]>('customer/edit', request);
    }
  }

  convertToRub(request: { overdraft: number }): void {
    const { overdraft } = this.form.value;
    request.overdraft = overdraft * 100;
  }

  delete(): void {
    const request = { customerId: this.customerId };
    this.result$ = this.dialog
      .open(ConfirmDialogComponent, {
        width: '450px',
      })
      .afterClosed()
      .pipe(
        filter(a => a),
        switchMap(() =>
          this.api.post<ErrorCode[]>('customer/delete', request).pipe(
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

  hasError(name: string, validator: string) {
    return this.form.get(name).hasError(validator);
  }
}
