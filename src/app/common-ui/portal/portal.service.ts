import {Injectable, type TemplateRef, type ViewContainerRef} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PortalService {
  #container?: ViewContainerRef

  registerContainer(vcr: ViewContainerRef) {
    this.#container = vcr
  }
  render(templ: TemplateRef<any>) {
    setTimeout(() => {
      this.#container?.createEmbeddedView(templ)
    })
  }

  destroy() {
    this.#container?.clear()
  }
  constructor() { }
}
