import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';

import { ApiService } from '../../services/api.service';

interface OrderDownloadModel {
  archivePassword: string;
  archiveFiles: string[];
}

@Component({
  selector: 'mpr-order-download',
  templateUrl: './order-download.component.html',
  styleUrls: ['./order-download.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDownloadComponent implements OnInit {
  data$: Observable<OrderDownloadModel>;
  constructor(
    private route: ActivatedRoute,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const orderId = +this.route.snapshot.paramMap.get('id');
    this.toolbarService.setConfig({ name: `Скачивание корпоративного заказа № ${orderId}`, back: { url: '../../', route: this.route } });
    this.data$ = this.api.post('order/files', { orderId });
  }

  cancel(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
