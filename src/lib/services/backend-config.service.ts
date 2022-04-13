import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { BackendConfig } from '../models/backend-config';
import { ApiService } from './api.service';

@Injectable()
export class BackendConfigService {
  private configSequence$!: Observable<BackendConfig>;

  constructor(private api: ApiService) {}

  load(): Observable<BackendConfig> {
    if (!this.configSequence$) {
      this.configSequence$ = this.api.get<BackendConfig>('user_params').pipe(shareReplay());
    }
    return this.configSequence$;
  }
}
