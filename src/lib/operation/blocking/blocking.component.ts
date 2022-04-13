import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IToolbarService, TOOLBAR_TOKEN } from '@sew/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ErrorCode } from '../../models/error-code';
import { OperationService } from '../../services/operation.service';

@Component({
  templateUrl: './blocking.component.html',
  styleUrls: ['./blocking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockingComponent implements OnInit {
  form = this.fb.group({
    codes: [],
    comment: [],
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
    this.toolbarService.setConfig({ name: 'Блокировка ПК', back: { url: '../../', route: this.route } });
  }

  submit(): void {
    if (this.form.valid) {
      const { comment, codes } = this.form.value;
      if (this.service.asArray(codes)) {
        const packets = codes
          .map(code => ({ code }))
          .reduce(this.service.groupByPacket(), [])
          .map(items => ({ comment, items }));

        const count = codes.length;

        if (count > 0) {
          this.result$ = this.service
            .showDialogAndClosed(this.confirmTemplate, { count })
            .pipe(switchMap(() => this.service.getResult(packets, 'card/block')));

          this.form.reset();
        }
      }
    }
  }
}
