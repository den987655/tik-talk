import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {map} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import type {ChatWsService} from '../interfaces/chat-ws-service.interface';
import type {Chat, LastMessageRes, Message} from '../interfaces/chats.interface';
import type {Profile} from '../interfaces/profile.interface';
import {ChatWsNativeService} from './chat-ws-native.service';
import {ProfileService} from './profile.service';

@Injectable({
  providedIn: 'root'
})

export class ChatsService {
  http = inject(HttpClient)
  #authService = inject(AuthService)
  me = inject(ProfileService).me

  wsAdapter: ChatWsService = new ChatWsNativeService()

  activeChatMessages = signal<Message[]>([])

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`
  messageUrl = `${this.baseApiUrl}message/`

  connectWs() {
    this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage
    })
  }


// TODO Замыкание
  handleWSMessage = (message: any) => {
    console.log(message)
    if (message.action === 'message') {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.messages,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false
        }
      ])
    }
  }

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {})
  }
  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`)
  }
  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`)
      .pipe(map(chat => {
        const patchedMessages = chat.messages.map(message => {
          return {
            ...message,
            user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
            isMine: message.userFromId === this.me()!.id
          }
        })

        this.activeChatMessages.set(patchedMessages)

        return {
          ...chat,
          companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
          messages: patchedMessages


        }
      }))
  }
  sendMessage(chat_id: number, message: string) {
    return this.http.post<Message>(`${this.messageUrl}send/${chat_id}`, {}, {
      params: {
        message
      }
    })
  }
}
