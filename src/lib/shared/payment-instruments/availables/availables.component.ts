import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgxPermissionsService, NgxPermissionsObject } from 'ngx-permissions';

const cardTypes = [
  { name: 'GC', title: 'ПКГН' },
  { name: 'KPK', title: 'КПК' },
  { name: 'APK', title: 'АПК' },
  { name: 'VPS', title: 'ВПС' },
  { name: 'VIP', title: 'VIP' },
  { name: 'PROMO', title: 'Промокоды' },
];
@Component({
  selector: 'mpr-payment-availables',
  templateUrl: './availables.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentAvailablesComponent implements OnInit {
  @Input() operation: 'view' | 'activation' | 'block' | 'prolongation';

  items: string[];
  loadedPermissions: NgxPermissionsObject;
  constructor(private permissionsService: NgxPermissionsService) {}

  ngOnInit(): void {
    this.loadedPermissions = this.permissionsService.getPermissions();
    this.items = cardTypes.filter(card => this.findPermission(card.name)).map(card => card.title);
  }

  findPermission(card: string): boolean {
    const name = `mprocessing_cards_${this.operation}_${card}`;
    return !!this.loadedPermissions[name];
  }
}
