import { Directive, inject, ElementRef } from '@angular/core';
import {COLOR} from '../post/color.token';

@Directive({
  selector: '[appTest]',
  standalone: true
})
export class TestDirective {
  elRef = inject(ElementRef)
  color = inject(COLOR)
  constructor() {
    // console.log(this.elRef.nativeElement)
    this.elRef.nativeElement.style.border = `10px solid ${this.color}`
  }
}
