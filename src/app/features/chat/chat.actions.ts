import actionCreatorFactory from 'typescript-fsa';
import {
  ChatEntity,
  ChatListItemEntity,
  ForwardMessagesPayload,
  GetChatMessagesPayload,
  GetMessageDonePayload,
  MessageEntity,
  PaginateMessagesPayloadDone,
} from './chat.types';

const actionCreator = actionCreatorFactory('[CHAT]');

export const setUnreadCountAction = actionCreator<number>('SET_UNREAD_COUNT');

export const getMessageChatAction = actionCreator.async<MessageEntity, GetMessageDonePayload>('GET_MESSAGE');
export const getChatsAction = actionCreator.async<void, ChatListItemEntity[]>('GET_CHATS');
export const getCreateChatAction = actionCreator.async<string, any>('CREATE_CHAT');
export const sendMessageAction = actionCreator.async<FormData, MessageEntity>('SEND_MESSAGE');
export const getDialogAction = actionCreator.async<string, ChatEntity>('GET_DIALOG');
export const getChatMessagesAction = actionCreator.async<GetChatMessagesPayload, ChatEntity>('GET_CHAT_MESSAGES');
export const forwardMessagesAction = actionCreator.async<ForwardMessagesPayload, void>('FORWARD_MESSAGES');
export const paginationMessagesAction = actionCreator.async<GetChatMessagesPayload, PaginateMessagesPayloadDone>(
  'PAGINATION_MESSAGES',
);
export const readChatAction = actionCreator.async<string, ChatListItemEntity>('READ');
