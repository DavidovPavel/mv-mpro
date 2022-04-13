import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'mpr-order-certificate',
  templateUrl: './order-certificate.component.html',
  styleUrls: ['./order-certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCertificateComponent implements OnInit {
  images$: Observable<{ imageId: number; imageFileName: string }>;

  @Input() emissionId: number;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.images$ = this.api.post('emission/images', { emissionId: this.emissionId });
  }
}
