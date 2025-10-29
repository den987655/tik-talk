import {
  type AfterViewInit,
  Component,
  inject,
  type OnDestroy,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {PortalService} from '../portal/portal.service';

@Component({
  selector: 'app-sidebar-portal',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-portal.component.html',
  styleUrl: './sidebar-portal.component.scss'
})
export class SidebarPortalComponent implements AfterViewInit, OnDestroy{
  portalContent = viewChild('portalContent', {read: TemplateRef})
  sidebarPortalService = inject(PortalService)

  ngAfterViewInit() {
    const portalContent = this.portalContent()
    if (!portalContent) return
    this.sidebarPortalService.render(portalContent)
  }

  ngOnDestroy() {
    this.sidebarPortalService.destroy()
  }
}
