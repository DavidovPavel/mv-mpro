import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { ApiService, StateInfoResult } from '../services/api.service';
import { OperationService } from '../services/operation.service';

@Component({
  selector: 'mpr-info',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit {
  inputControl = new FormControl('', Validators.required);
  currencySymbol = getCurrencySymbol('RUB', 'narrow');

  promocodeInfoURL = '/promocode-info/';

  param$: Observable<string>;
  dataSource$: Observable<StateInfoResult>;
  column = ['code', 'id', 'balance', 'status', 'type', 'wareCode', 'dateFromA', 'dateToA', 'dateFrom', 'dateTo', 'poolName', 'orderNumber', 'notes'];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private service: OperationService
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Информация по ПК, промокодам и ВПС', back: { url: '../', route: this.route } });

    this.param$ = this.route.paramMap.pipe(
      map(p => p.get('code')),
      filter(code => !!code),
      tap(code => this.show([code]))
    );
  }

  show(output: string[]): void {
    if (output?.length) {
      const packets = output.map(code => ({ code })).reduce(this.service.groupByPacket(), []);
      this.dataSource$ = this.service.getResult(packets, 'card/state');
    }
  }

  checkDateMoreCurrent(date: string): boolean {
    const current = Date.now();
    const input = Date.parse(date);
    return input > current;
  }

  checkDateLessCurrent(date: string): boolean {
    const current = Date.now();
    const input = Date.parse(date);
    return input < current;
  }
}
