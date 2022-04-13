import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[mprHideEmpty]',
})
export class HideEmptyDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;
    const div = el.nextSibling as HTMLElement;
    el.hidden = !div.getElementsByTagName('a').length;
  }
}
