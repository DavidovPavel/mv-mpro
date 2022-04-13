import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, pluck, startWith, tap } from 'rxjs/operators';

import { BackendConfigService } from './../../../services/backend-config.service';

@Component({
  selector: 'mpr-list-control',
  templateUrl: './list-control.component.html',
  styleUrls: ['./list-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListControlComponent implements OnInit {
  inputCount$: Observable<number>;

  inputControl = new FormControl('');

  config$ = this.config.load();

  @Input() input: FormControl;
  @Input() value: string;

  constructor(private config: BackendConfigService) {}

  ngOnInit(): void {
    this.value = this.value ?? '';
    this.inputControl.setValidators(this.input.validator);
    this.inputCount$ = this.inputControl.valueChanges.pipe(
      startWith(this.value),
      map<string, string[]>(v => [...new Set(v.split('\n'))]),
      map(a => a.map(b => b.replace(/\s/g, '')).filter(c => c !== '')),
      tap(v => this.input.setValue(v)),
      pluck('length')
    );

    this.inputControl.setValue(this.value);
  }

  hasError(validator: string) {
    return this.input.hasError(validator);
  }
}
