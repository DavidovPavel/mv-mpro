import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ErrorCode } from '../../models/error-code';
import { MprPermissions } from '../../permissions';
import { ApiService } from '../../services/api.service';
import { OperationService } from '../../services/operation.service';
import { CodeInfo } from './../../models/code-info';

@Component({
  selector: 'mpr-operator-interface',
  templateUrl: './operator-interface.component.html',
  styleUrls: ['./operator-interface.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorInterfaceComponent implements OnInit {
  permissions = MprPermissions;
  showForm = false;

  infoForm = this.fb.group({
    cardNum: ['', Validators.required],
    code: [''],
  });

  blockForm = this.fb.group({
    blockComment: ['', Validators.required],
  });

  currencySymbol = getCurrencySymbol('RUB', 'narrow');
  promocodeInfoURL = '/promocode-info/';

  dataSource$: Observable<ErrorCode | CodeInfo>;
  result$: Observable<ErrorCode[]>;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private service: OperationService
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Интерфейс оператора контакт-центра', back: { url: '../../', route: this.route } });
  }

  checkDate(row: CodeInfo): boolean {
    return Date.parse(row.dateTo) < Date.now() || Date.parse(row.dateFrom) > Date.now();
  }

  getInfo(): void {
    if (this.infoForm.valid) {
      const code = this.infoForm.get('cardNum').value;
      const barcode = this.infoForm.get('code').value;
      this.dataSource$ = this.api
        .post<ErrorCode | CodeInfo>('card/state_barcode', { code, barcode })
        .pipe(tap(item => this.checkProlongation(item)));
    }
  }

  checkProlongation(info: ErrorCode | CodeInfo): void {
    if (this.isCodeInfo(info)) {
      const { used, prolongated, dateTo, status } = info;
      info.prolongated = prolongated && used && Date.parse(dateTo) < Date.now() && status === 1;
    }
  }

  isCodeInfo(info: ErrorCode | CodeInfo): info is CodeInfo {
    return !Array.isArray(info);
  }

  prolongation(): void {
    const comment = '';
    const dateTo = null;
    const code = this.infoForm.get('cardNum').value;
    const items = [{ code }];
    this.result$ = this.service.getResultWithConfirm([{ comment, dateTo, items }], 'card/prolongation');
  }

  blocking(): void {
    if (this.blockForm.valid && this.showForm) {
      const code = this.infoForm.get('cardNum').value;
      const items = [{ code }];
      const comment = this.blockForm.get('blockComment').value;
      this.result$ = this.service.getResultWithConfirm([{ comment, items }], 'card/block');
      this.showForm = false;
    } else {
      this.blockForm.markAllAsTouched();
    }
  }
}
