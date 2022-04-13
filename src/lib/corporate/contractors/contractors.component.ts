import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { Contractor } from '../../models/contractor';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'mpr-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractorsComponent implements OnInit {
  typeId = 1;
  statusControl = new FormControl(1);
  currencySymbol = getCurrencySymbol('RUB', 'narrow');

  dataSource$: Observable<Contractor[]>;

  columns = [
    'shortCompanyName',
    'locationAddress',
    'contactPerson',
    'contactEmail',
    'contactPhone',
    'notes',
    'customerDiscount',
    'balance',
    'customerDiscountForCards',
    'balanceForCards',
  ];

  constructor(private route: ActivatedRoute, @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService, private api: ApiService) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Справочник контрагентов', back: { url: '../../', route: this.route } });
    this.getData();
  }

  changeType(index: number): void {
    this.typeId = index + 1;
    this.getData();
  }

  getData(): void {
    const request = { type: this.typeId, status: +this.statusControl.value };
    this.dataSource$ = this.api.post('customers/find', request);
  }

}
