import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ErrorCode } from '../../models/error-code';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'mpr-add-contractor',
  templateUrl: './add-contractor.component.html',
  styleUrls: ['./add-contractor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddContractorComponent implements OnInit {
  currencySymbol = getCurrencySymbol('RUB', 'narrow');

  form = this.fb.group({
    status: [1],
    type: [1],
    fullCompanyName: [''],
    shortCompanyName: ['', Validators.required],
    inn: ['', Validators.required],
    kpp: [''],
    ogrn: [''],
    legalAddress: [''],
    locationAddress: [''],
    overdraft: [
      0,
      [Validators.required, Validators.pattern(new RegExp(/^[0-9]+$/)), Validators.min(0)],
    ],
    directorName: [''],
    document: ['0'],
    contactPerson: [''],
    contactEmail: [''],
    contactPhone: [''],
    bankName: [''],
    bankAddress: [''],
    rs: [''],
    ks: [''],
    bik: [''],
    customerDiscount: [
      0,
      [Validators.pattern(new RegExp(/^[0-9]+$/)), Validators.min(0), Validators.max(100)],
    ],
    customerDiscountForCards: [
      0,
      [Validators.pattern(new RegExp(/^[0-9]+$/)), Validators.min(0), Validators.max(100)],
    ],
    notes: [''],
  });

  result$: Observable<ErrorCode[]>;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({
      name: 'Добавление агента/клиента',
      back: { url: '../', route: this.route },
    });
    const qpm = this.route.snapshot.paramMap;
    this.form.get('status').setValue(+qpm.get('status'));
    this.form.get('type').setValue(+qpm.get('type'));
  }

  add(): void {
    if (this.form.valid) {
      const request = this.form.value;
      this.convertToRub(request);
      this.result$ = this.api
        .post<ErrorCode[]>('customer/add', request)
        .pipe(tap(() => this.router.navigate(['../'], { relativeTo: this.route })));
    }
  }

  convertToRub(request: { overdraft: number }): void {
    const { overdraft } = this.form.value;
    request.overdraft = overdraft * 100;
  }

  hasError(name: string, validator: string) {
    return this.form.get(name).hasError(validator);
  }
}
