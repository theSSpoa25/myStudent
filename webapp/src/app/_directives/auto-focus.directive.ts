import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective {

  @Input() public appAutoFocus: boolean;

  constructor(private elementRef: ElementRef) {}

  public ngAfterContentInit() {
    setTimeout( _ => {
      this.elementRef.nativeElement.focus();
    }, 0)
  }


}
