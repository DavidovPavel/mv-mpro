import { Subscription } from 'rxjs';
import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ExtraNominal } from '../add-order/add-order.component';

@Component({
  selector: 'mpr-add-nominal-order',
  templateUrl: './add-nominal-order.component.html',
  styleUrls: ['./add-nominal-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNominalOrderComponent implements OnInit, OnDestroy {
  currencySymbol = getCurrencySymbol('RUB', 'narrow');
  form = this.fb.array([]);
  subscribtion: Subscription;
  @Output() list = new EventEmitter<ExtraNominal[]>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscribtion = this.form.valueChanges.subscribe(() => this.list.emit(this.form.value));
  }

  add(): void {
    const group = this.fb.group({
      nominal: [500, Validators.min(1)],
      quantity: [1, Validators.min(1)],
    });
    this.form.push(group);
    this.list.emit(this.form.value);
  }

  clear(i: number): void {
    this.form.removeAt(i);
    this.list.emit(this.form.value);
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
