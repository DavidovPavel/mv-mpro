import { Order } from './../../models/order';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cost',
})
export class CostPipe implements PipeTransform {
  transform(row: Order): number {
    return Math.floor(row.nominal * row.quantity * ((100 - row.discount) / 100));
  }
}
