import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { Directive, inject, ElementRef } from '@angular/core';
import {COLOR} from '../post/color.token';

@Directive({
  selector: '[appTest]',
  standalone: true
})
export class TestDirective {
  elRef = inject(ElementRef)
  color = inject(COLOR)

  nodeName = this.elRef.nativeElement.nodeName
  constructor() {
    // console.log(this.elRef.nativeElement)
    this.elRef.nativeElement.style.border = `2px solid ${this.color}`

  }
}
