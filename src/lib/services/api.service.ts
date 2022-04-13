import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from '@sew/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, pluck } from 'rxjs/operators';

import { CodeInfo } from '../models/code-info';
import { ErrorCode } from '../models/error-code';
import { PreloaderService } from './preloader.service';

const apiUrl = '/api/mproc/api/v3/';

export type StateInfoResult = (ErrorCode | CodeInfo)[];

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private preloader: PreloaderService
  ) {}

  get<T>(url: string): Observable<T> {
    this.preloader.start();
    return this.http.get<T>(`${apiUrl}${url}`).pipe(
      catchError(e => this.showError(e)),
      pluck('response'),
      finalize<T>(() => this.preloader.end())
    );
  }

  post<T>(url: string, request: unknown): Observable<T> {
    this.preloader.start();
    return this.http
      .post<T>(`${apiUrl}${url}`, { request })
      .pipe(
        catchError(e => this.showError(e)),
        pluck('response'),
        finalize<T>(() => this.preloader.end())
      );
  }

  showError(e: HttpErrorResponse): Observable<{ response: ErrorCode[] }> {
    if (this.isErrorCode(e.error)) {
      const response = [e.error];
      return of({ response });
    } else {
      this.errorService.showError(e.message, { duration: 10000 });
      return throwError(e);
    }
  }

  private isErrorCode(error: unknown): error is ErrorCode {
    return error && typeof error === 'object' && 'errorMessage' in error;
  }
}
