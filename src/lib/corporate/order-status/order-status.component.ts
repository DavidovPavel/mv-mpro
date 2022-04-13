import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Order } from '../../models/order';

@Component({
  selector: 'mpr-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderStatusComponent {
  orderStatusName = ['Hе оплачен', 'Oплачен', 'Cгенерирован', 'Oшибка'];
  @Input() order: Order;
}
