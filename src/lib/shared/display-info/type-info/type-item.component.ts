import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CodeInfo } from '../../../models/code-info';
import { MAIN_TYPE_CODE } from '../status-info/status-info.component';

const output = {
  12000000: 'ПКГН',
  12100000: 'КПК',
  10100000: 'ВПС',
  10000001: 'ВПС Trade-in',
  22000000: 'Скидочная карта',
  21000000: 'Скидочный купон',
  20000100: 'Промо-код',
  20000111: 'Акционный Промо-код',
  20000122: 'Поощрительный Промо-код',
  20000133: 'ГЛЦ Промо-код',
  20000144: 'Промо-код на утилизацию',
  20000155: 'Промо-код мой любимый магазин',
  20000166: 'Промо-код',
  20000177: 'Извинительный Промо-код',
  20000188: 'Партнерский Промо-код',
  20000199: 'PickUp Промо-код',
};

const outputTypes = {
  '1': 'Для физлиц',
  '2': 'Корпоративная',
  '6': 'Акционная',
  '7': 'МКМО',
};

@Component({
  selector: 'mpr-type-info',
  template: `<div>{{ output }}</div><div [style.fontSize]="'small'">{{ outputTypes }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeInfoComponent implements OnInit {
  output = '';
  outputTypes = '';

  @Input() row: CodeInfo;

  constructor() {}

  ngOnInit(): void {
    const { code, instTypeCode } = this.row;

    if (output[instTypeCode]) {
      this.output = output[instTypeCode];
    } else {
      const s61 = code.substr(6, 1);

      if (s61 === MAIN_TYPE_CODE) {
        this.output = 'ВПС';
      } else {
        const s75 = code.substr(7, 5);

        this.output = s75 === '00000' ? 'ПКГН' : 'ПКФН';

        if (outputTypes[s61]) {
          this.outputTypes = outputTypes[s61];
        } else {
          this.outputTypes = '(Не определено)';
        }
      }
    }
  }
}
