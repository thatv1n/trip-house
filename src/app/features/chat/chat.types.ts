import { BasicModel, Option, UserEntity } from '@/types';
import { EventResponse, Pictures } from '../aboutEvent/event.types';

export enum ChatType {
  EVENT = 'event',
  PERSONAL = 'personal',
}

export enum MessageType {
  TEXT = 'text',
  PICTURES = 'pictures',
  AUDIO = 'audio',
  NOTE = 'note',
  INVITE_EVENT = 'inviteEvent',
  FORWARD = 'forward',
}

export enum MessageInviteEventStatus {
  REQUESTED = 'requested',
  ACCEPT = 'accept',
  REJECT = 'reject',
}

export interface ChatListItemEntity extends BasicModel {
  type: ChatType;
  countUnread: number;

  lastReadId: Option<string>;
  lastMessage: Option<MessageEntity>;
  event: Option<EventResponse>;
  target: Option<UserEntity>;
}

export interface ChatListLs {
  chatId: string;
  lastMessage: Option<MessageEntity>;
  count: number;
}

export interface ChatEntity extends BasicModel {
  type: ChatType;
  event: Option<EventResponse>;
  target: Option<UserEntity>;
  messages: MessageEntity[];
}

export interface ChatFull extends BasicModel {
  type: ChatType;
  event: Option<EventResponse>;
  target: Option<UserEntity>;
  messageIds: string[];
}

export interface MessageEntity extends BasicModel {
  type: MessageType;
  chatId: string;
  sender: UserEntity;
  text: Option<string>;
  pictures: Option<Pictures>;
  audioUrl: Option<string>;
  event: Option<EventResponse>;
  inviteEventStatus: Option<MessageInviteEventStatus>;
  note: Option<string>;
  forward: Option<MessageEntity>;
}

export interface ChatState {
  chat: Record<string, ChatListItemEntity>;
  chatListIds: string[];
  chatsFull: Record<string, ChatFull>;
  messages: Record<string, MessageEntity>;
  countUnread: number;
}

export interface GetMessageDonePayload {
  message: MessageEntity;
  chat: ChatListItemEntity;
}

export interface InviteEventPayload {
  targetUserId: string;
  eventId: string;
}

export interface InviteEventRequest {
  chatId: string;
  eventId: string;
}

export interface ChangeInviteStatusPayload {
  messageId: string;
  status: MessageInviteEventStatus;
}

export interface GetChatMessagesPayload {
  chatId: string;
  limit: number;
  offset: number;
}

export interface PaginateMessagesPayloadDone {
  chatId: string;
  messages: MessageEntity[];
}

export interface ForwardMessagesPayload {
  toChatId: string;
  messageIds: string[];
}
