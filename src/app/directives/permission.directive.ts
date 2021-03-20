import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPer]'
})
export class PermissionDirective implements OnChanges {

  @Input() appPer: any;

  constructor(private el: ElementRef) {
    console.log(el)
  }

  ngOnChanges(changes: SimpleChanges) {
    const roles = changes.appPer.currentValue.map(role => role.name);
    if (roles.indexOf('SUPER_ADMIN') === -1 || roles.indexOf['ADMIN'] === -1) {
      this.el.nativeElement.hidden = true;
    }
  }

}
