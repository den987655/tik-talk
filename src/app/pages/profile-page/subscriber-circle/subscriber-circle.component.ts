import {Component, HostListener, input, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PortalComponent} from '../../../common-ui/portal/portal.component';
import type {Profile} from '../../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-subscriber-circle',
  standalone: true,
  imports: [
    ImgUrlPipe,
    RouterLink,
    PortalComponent
  ],
  templateUrl: './subscriber-circle.component.html',
  styleUrl: './subscriber-circle.component.scss'
})
export class SubscriberCircleComponent {
  subscriber = input<Profile>()
  isMouseOver = signal(false)

  @HostListener('mouseover')
  onMouseOver() {
    this.isMouseOver.set(true)
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.isMouseOver.set(false)
  }
}
