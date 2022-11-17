import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrevent]'
})
export class PreventDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: any) {
    if(e.key === '-' || e.key === '+' || e.key === 'e') {
      e.preventDefault()
    }
  }

}
