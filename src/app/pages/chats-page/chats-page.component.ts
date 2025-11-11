import {Component, inject, type OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChatsService} from '../../data/services/chats.service';
import {TestDirective} from '../profile-page/post-feed/test.directive';
import {COLOR} from '../profile-page/post/color.token';
import {ChatsListComponent} from './chats-list/chats-list.component';

@Component({
  selector: 'app-chats-page',
  imports: [
    RouterOutlet,
    ChatsListComponent,
    TestDirective
  ],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
  standalone: true,
  providers: [
    {provide: COLOR, useValue: 'red'}
  ]
})
export class ChatsPageComponent implements OnInit{
  #chatService = inject(ChatsService)

  ngOnInit() {
    this.#chatService.connectWs()
  }
}
