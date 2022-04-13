import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactHistoryResult } from '../../models/transact-history-result';
import { ApiService } from '../../services/api.service';

@Injectable()
export class HistoryService {
  constructor(private api: ApiService) {}

  getHistory(code: string, pageNumber = 1, shortHistory = false): Observable<TransactHistoryResult> {
    const request = {
      code,
      pageNumber,
      shortHistory,
    };
    return this.api.post<TransactHistoryResult>('card/history', request);
  }
}
