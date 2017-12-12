import { Directive } from '@angular/core';
import { ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlightText('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlightText(null);
  }

  private highlightText(color: string) {
    this.el.nativeElement.style.backgroundColor = color;

  }
}
