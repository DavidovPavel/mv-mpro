import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

import { Order, OrderList } from '../../models/order';
import { ApiService } from '../../services/api.service';
import { MprPermissions } from './../../permissions';

@Component({
  selector: 'mpr-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  permissions = MprPermissions;
  currencySymbol = getCurrencySymbol('RUB', 'narrow');
  totalNumberItems = 0;
  pageIndex = 0;
  pageSize = 100;

  deliveryMethodName = ['JPG', 'PNG'];

  columns = [
    'dt',
    'orderId',
    'customerName',
    'emissionName',
    'nominal',
    'quantity',
    'discount',
    'cost',
    'deliveryMethod',
    'archiveSize',
    'orderStatus',
    'action',
  ];

  dataSource$: Observable<Order[]>;

  constructor(private route: ActivatedRoute, @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService, private api: ApiService) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Заказы', back: { url: '../../', route: this.route } });
    this.getData();
  }

  getData(): void {
    this.dataSource$ = this.api
      .post<OrderList>('orders', { pageNumber: this.pageIndex + 1 })
      .pipe(
        tap(res => (this.totalNumberItems = res.pagesCount * this.pageSize)),
        pluck('items')
      );
  }

  pageEvent(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.getData();
  }
}
