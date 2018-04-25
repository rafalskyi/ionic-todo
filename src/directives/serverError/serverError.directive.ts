/**
 * Created by raf on 7/13/17.
 */
import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
  constructor(el: ElementRef) {
    console.log('--->', el);
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
