import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ErrorCode } from '../../models/error-code';
import { OperationService } from '../../services/operation.service';

@Component({
  selector: 'mpr-prolongation',
  templateUrl: './prolongation.component.html',
  styleUrls: ['./prolongation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProlongationComponent implements OnInit {
  form = this.fb.group({
    codes: [],
    comment: [],
    dateTo: ['', Validators.required],
  });

  result$: Observable<ErrorCode[]>;

  @ViewChild('confirm', { read: TemplateRef }) confirmTemplate: TemplateRef<unknown>;

  constructor(
    private fb: FormBuilder,
    @Inject(TOOLBAR_TOKEN) private toolbarService: IToolbarService,
    private route: ActivatedRoute,
    private service: OperationService
  ) {}

  ngOnInit(): void {
    this.toolbarService.setConfig({ name: 'Пролонгация ПК или ВПС', back: { url: '../../', route: this.route } });
  }

  submit(): void {
    if (this.form.valid) {
      const { comment, codes, dateTo } = this.form.value;
      if (this.service.asArray(codes)) {
        const packets = codes
          .map(code => ({ code }))
          .reduce(this.service.groupByPacket(), [])
          .map(items => ({ comment, dateTo, items }));

        const count = codes.length;

        if (count > 0) {
          this.result$ = this.service
            .showDialogAndClosed(this.confirmTemplate, { count })
            .pipe(switchMap(() => this.service.getResult(packets, 'card/prolongation')));
        }
      }
    }
  }
}
