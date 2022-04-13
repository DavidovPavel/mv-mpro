import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PreloaderService {
  private counter = 0;

  active$: Subject<boolean> = new Subject<boolean>();
  active = this.active$.asObservable();

  start(): void {
    if (this.counter === 0) {
      this.active$.next(true);
    }
    this.counter++;
  }

  end(): void {
    this.counter--;
    if (this.counter === 0) {
      this.active$.next(false);
    }
  }
}
