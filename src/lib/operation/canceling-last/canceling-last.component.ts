import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';

import { ErrorCode } from '../../models/error-code';
import { LastTransaction } from '../../models/last-transaction';
import { MprPermissions } from '../../permissions';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'mpr-canceling-last',
  templateUrl: './canceling-last.component.html',
  styleUrls: ['./canceling-last.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelingLastComponent implements OnInit {
  permissions = MprPermissions;
  currencySymbol = getCurrencySymbol('RUB', 'narrow');
  form = this.fb.group({
    cardNum: ['', Validators.required],
    comment: [''],
  });

  dataSource$: Observable<ErrorCode | LastTransaction>;
  result$: Observable<ErrorCode[]>;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Отмена последней транзакции', back: { url: '../../', route: this.route } });
  }

  getLast(): void {
    if (this.form.valid) {
      const code = this.form.get('cardNum').value;
      this.dataSource$ = this.api.post<LastTransaction>('card/cancel_get_last', { code });
    }
  }

  canceling(trId: string): void {
    const comment = this.form.get('comment').value;
    this.result$ = this.api.post('card/cancel_transaction', { trId, comment });
  }
}
