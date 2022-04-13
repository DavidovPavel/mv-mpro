import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ErrorCode } from '../../models/error-code';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'mpr-order-activation',
  templateUrl: './order-activation.component.html',
  styleUrls: ['./order-activation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderActivationComponent implements OnInit {
  comment = new FormControl('');
  orderId: number;
  result$: Observable<ErrorCode[]>;

  constructor(
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.toolbarService.setConfig({ name: `Активация корпоративного заказа № ${this.orderId}`, back: { url: '../../', route: this.route } });
  }

  done(): void {
    this.result$ = this.api
      .post<ErrorCode[]>('order/activate', {
        orderId: this.orderId,
        comment: this.comment.value,
      })
      .pipe(
        tap(a => {
          if (a === null) {
            this.cancel();
          }
        })
      );
  }

  cancel(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
