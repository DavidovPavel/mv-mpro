import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { concat, Observable, Subject } from 'rxjs';
import { concatAll, filter, map, mergeAll, switchMap, toArray } from 'rxjs/operators';

import { Customer, CustomerType } from '../models/customer';
import { DictItem } from '../models/dict-item';
import { ErrorCode } from '../models/error-code';
import { ApiService } from '../services/api.service';
import { ConfirmDialogComponent } from '../shared/mpr-dialog/confirm-dialog/confirm-dialog.component';
import { BackendConfigService } from './../services/backend-config.service';

@Injectable()
export class OperationService {
  maxBackPacketSize = 100;
  maxBackPacketSize$ = new Subject<number>();
  maxBackPacketSize$$ = this.maxBackPacketSize$.asObservable();

  constructor(private api: ApiService, public dialog: MatDialog, private config$: BackendConfigService) {
    this.config$.load().subscribe(data => (this.maxBackPacketSize = data.maxBackPacketSize));
  }

  getDictionaryCustomer(): Observable<DictItem[]> {
    return this.api.get<Customer[]>('customers').pipe(
      concatAll(),
      map(a => ({ title: `${a.shortCompanyName} / ${a.inn || '--'} / ${CustomerType[a.customerType]}`, value: a.customerID })),
      toArray()
    );
  }

  groupByPacket<T>(): (previous: T[][], current: T, index: number) => T[][] {
    const max = this.maxBackPacketSize;
    return (p: T[][], c: T, i: number): T[][] => {
      const n = Math.floor(i / max);
      p[n] = [...(p[n] || []), c];
      return p;
    };
  }

  asArray(value: unknown): value is string[] {
    return Array.isArray(value);
  }

  showDialogAndClosed(template: TemplateRef<unknown> = null, data: unknown = null): Observable<unknown> {
    return this.dialog
      .open(ConfirmDialogComponent, {
        width: '450px',
        data: { template, data },
      })
      .afterClosed()
      .pipe(filter(a => a));
  }

  getResult<T>(packets: T[], url: string): Observable<ErrorCode[]> {
    return concat(packets.map(a => this.api.post<ErrorCode[]>(url, a))).pipe(mergeAll(), concatAll(), toArray());
  }

  getResultWithConfirm<T>(packets: T[], url: string): Observable<ErrorCode[]> {
    return this.showDialogAndClosed().pipe(switchMap(() => this.getResult(packets, url)));
  }
}
