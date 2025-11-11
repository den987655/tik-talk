import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {map, startWith, switchMap} from 'rxjs';
import {ChatsService} from '../../../data/services/chats.service';
import {TestDirective} from '../../profile-page/post-feed/test.directive';
import {ChatsBtnComponent} from '../chats-btn/chats-btn.component';

@Component({
  selector: 'app-chats-list',
  imports: [
    ChatsBtnComponent,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    TestDirective
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',

  standalone: true
})
export class ChatsListComponent {
  directive = inject(TestDirective)
  constructor() {
    console.log(this.directive.nodeName)
  }
  chatsService = inject(ChatsService)

  filterChatsControl = new FormControl('')

  chats$ = this.chatsService.getMyChats()
    .pipe(
      switchMap(chats => {
        return this.filterChatsControl.valueChanges
          .pipe(
            startWith(''),
            map(inputValue => {
              return chats.filter(chat => {
                return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
              })
            })
          )
      })
    )
}
