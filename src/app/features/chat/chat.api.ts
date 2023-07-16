import { CoreApi } from '@/api';
import { Observable } from 'rxjs';
import {
  ChangeInviteStatusPayload,
  ChatEntity,
  ChatListItemEntity,
  ForwardMessagesPayload,
  GetChatMessagesPayload,
  InviteEventPayload,
  InviteEventRequest,
  MessageEntity,
} from './chat.types';

export class ChatApi extends CoreApi {
  getChats(): Observable<ChatListItemEntity[]> {
    return this.get(`/chat`);
  }
  createChat(id: string): Observable<ChatEntity> {
    return this.post(`/chat`, { targetUserId: id });
  }

  sendMessage(body: FormData): Observable<MessageEntity> {
    return this.postFiles(`/chat/message`, body);
  }

  paginationChat(params: GetChatMessagesPayload): Observable<MessageEntity[]> {
    return this.get(`/chat/message/${params.chatId}?limit=${params.limit}&offset=${params.offset}`);
  }

  getDialog(chatId: string): Observable<ChatEntity> {
    return this.get(`/chat/${chatId}`);
  }

  getChatListItemById(chatId: string): Observable<ChatListItemEntity> {
    return this.get(`/chat/list-item/${chatId}`);
  }

  getOrCreatePersonalChat(targetUserId: string): Observable<ChatEntity> {
    return this.put(`/chat/personal-chat/${targetUserId}`);
  }

  forwardMessages(body: ForwardMessagesPayload): Observable<boolean> {
    return this.post(`/chat/forward`, body);
  }

  readChatById(chatId: string): Observable<ChatListItemEntity> {
    return this.put(`/chat/read/${chatId}`);
  }

  getInvitesByTargetId(targetUserId: string): Observable<MessageEntity> {
    return this.put(`/event/invite/${targetUserId}`);
  }

  changeInviteEventStatus(body: ChangeInviteStatusPayload): Observable<MessageEntity> {
    return this.put(`/event/invite`, body);
  }

  inviteEvent(body: InviteEventPayload): Observable<boolean> {
    return this.post(`/event/invite`, body);
  }
}
