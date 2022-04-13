import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';

import { WareCode } from '../../models/ware-code';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'mpr-cards-generation',
  templateUrl: './cards-generation.component.html',
  styleUrls: ['./cards-generation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsGenerationComponent implements OnInit {
  form = this.fb.group({
    prefix: [1118],
    series: [],
    type: [0],
    count: [],
    poolName: [],
    wareCode: [],
    startDate: [],
    endDate: []
  });

  warecodes$: Observable<WareCode[]>;

  constructor(
    private fb: FormBuilder,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Генерация карт', back: { url: '../../', route: this.route } });
    this.warecodes$ = this.api.get('warecodes');
  }

  done(): void {
    // TODO:
  }
}
