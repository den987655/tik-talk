import {Component, inject, input, type OnInit, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {MessageInputComponent} from '../../../../common-ui/message-input/message-input.component';
import type {Chat, Message} from '../../../../data/interfaces/chats.interface';
import {ChatsService} from '../../../../data/services/chats.service';
import {ChatWorkspaceMessageComponent} from './chat-workspace-message/chat-workspace-message.component';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [
    MessageInputComponent,
    ChatWorkspaceMessageComponent
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatService = inject(ChatsService)

  chat = input.required<Chat>()

  messages = this.chatService.activeChatMessages

  async onSendMessage(messageText: string) {
   await firstValueFrom(this.chatService.sendMessage(this.chat().id, messageText))

  await firstValueFrom(this.chatService.getChatById(this.chat().id))

  }
}
