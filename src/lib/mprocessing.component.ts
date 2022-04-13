import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PreloaderService } from './services/preloader.service';

@Component({
  templateUrl: './mprocessing.component.html',
  styleUrls: ['./mprocessing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MprocessingComponent implements OnInit {
  status$!: Observable<boolean>;
  constructor(private preloader: PreloaderService) {}

  ngOnInit(): void {
    this.status$ = this.preloader.active;
  }
}
