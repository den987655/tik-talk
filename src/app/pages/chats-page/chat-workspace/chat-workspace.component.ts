import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';
import {ChatsService} from '../../../data/services/chats.service';
import {ChatWorkspaceHeaderComponent} from './chat-workspace-header/chat-workspace-header.component';
import {
  ChatWorkspaceMessagesWrapperComponent
} from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';

@Component({
  selector: 'app-chat-workspace',
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss'
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute)
  chatService = inject(ChatsService)

  activeChat$ = this.route.params
    .pipe(
      switchMap(({id}) => this.chatService.getChatById((id)))
    )

}
