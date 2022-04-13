import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { pluck, switchMap, tap } from 'rxjs/operators';

import { TransactHistory } from '../../models/transact-history';
import { MprPermissions } from '../../permissions';
import { PreviousRouteService } from './../../services/previous-route.service';
import { HistoryService } from './history.service';

@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HistoryService],
})
export class HistoryComponent implements OnInit {
  permissions = MprPermissions;
  currentCode = '';

  totalNumberItems = 0;
  pageIndex = 0;
  pageSize = 100;

  shortHistory = false;

  currencySymbol = getCurrencySymbol('RUB', 'narrow');

  columns = [
    'entType',
    'trDescription',
    'errorMessage',
    'terminal',
    'amount',
    'dt',
    'orderId',
    'objectId',
    'shop',
    'login',
    'ipExternal',
    'ipInternal',
    'authCode',
    'trId',
    'trNo',
    'comment',
  ];

  dataSource$: Observable<TransactHistory[]>;

  constructor(
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private service: HistoryService,
    private routeService: PreviousRouteService
  ) {}

  ngOnInit(): void {
    this.currentCode = this.route.snapshot.paramMap.get('code');
    const url = this.routeService.getPreviousUrl() || `../../${this.currentCode}`;
    this.toolbarService.setConfig({
      name: `История транзакций для ${this.currentCode}`,
      back: { url, route: this.route },
    });

    this.dataSource$ = this.route.paramMap.pipe(
      switchMap(p =>
        this.service.getHistory(p.get('code')).pipe(
          tap(res => (this.totalNumberItems = res.pagesCount * this.pageSize)),
          pluck('searchResult')
        )
      )
    );
  }

  getData(): void {
    this.dataSource$ = this.service.getHistory(this.currentCode, this.pageIndex + 1, this.shortHistory).pipe(pluck('searchResult'));
  }

  pageEvent(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.getData();
  }

  display(e: MatCheckboxChange): void {
    this.shortHistory = e.checked;
    this.getData();
  }
}
