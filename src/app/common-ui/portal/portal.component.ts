import {
  type AfterViewInit,
  Component,
  effect,
  inject,
  input,
  OnDestroy, signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import {PortalService} from './portal.service';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss'
})
export class PortalComponent implements AfterViewInit, OnDestroy {
  #portalService = inject(PortalService)
  portalContent = viewChild('portalContent', {read: TemplateRef})

  host = input<HTMLElement>()

  top = signal(0)
  left = signal(0)

  constructor() {
    effect(() => {
      const host = this.host()
      if (!host) return
      const {bottom, left} = host.getBoundingClientRect()

      this.top.set(bottom)
      this.left.set(left)
    }, {allowSignalWrites: true})
  }

  ngAfterViewInit() {
    const portalContent = this.portalContent()
    if (!portalContent) return
    this.#portalService.render(portalContent)
  }
  ngOnDestroy() {
    this.#portalService.destroy()
  }
}
