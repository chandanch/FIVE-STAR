import { Directive } from '@angular/core';
import { ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('appHighlight') highlightColor: string;
  // tslint:disable-next-line:no-input-rename
  @Input('defaultHighlightColor') defaultColor: string;

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlightText(this.highlightColor || this.defaultColor || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlightText(null);
  }

  private highlightText(color: string) {
    this.el.nativeElement.style.backgroundColor = color;

  }
}
