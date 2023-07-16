import { Epic } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { ofActionWithMeta, ofAsyncAction } from '@tsfsa-ro';
import * as R from 'ramda';
import { combineEpics } from 'redux-observable';
import { catchError, mergeMap, of } from 'rxjs';
import { AnyAction } from 'typescript-fsa';
import { getUserSelector } from '../auth/auth.selectors';
import { getByTargetInviteEventAction, inviteEventAction } from '../invite-event';
import {
  forwardMessagesAction,
  getChatsAction,
  getCreateChatAction,
  getDialogAction,
  getMessageChatAction,
  paginationMessagesAction,
  readChatAction,
  sendMessageAction,
} from './chat.actions';
import { getChatListItemByIdSelector } from './chat.selectors';
import { ChatListItemEntity, ChatType, MessageEntity } from './chat.types';

const prepareChatListItem = (chatListItem: ChatListItemEntity, message: MessageEntity): ChatListItemEntity => {
  return R.compose<[ChatListItemEntity], ChatListItemEntity, ChatListItemEntity>(
    R.assoc('lastMessage', message),
    R.over(R.lensProp('countUnread'), R.inc),
  )(chatListItem);
};

const getMessageChatEpic: Epic = (action$, store$, { chatApi }) =>
  action$.pipe(
    ofAsyncAction(getMessageChatAction),
    mergeMap(({ done, failed, payload }) => {
      const chatListItem = getChatListItemByIdSelector(store$.value as any, payload.chatId);
      if (chatListItem) {
        const user = getUserSelector(store$.value);
        if (payload.sender.id === user?.id) {
          return of(done({ message: payload, chat: chatListItem }));
        }
        return of(done({ message: payload, chat: prepareChatListItem(chatListItem, payload) }));
      }
      return chatApi.getChatListItemById(payload.chatId).pipe(
        mergeMap((chat) => {
          return of(done({ message: payload, chat }));
        }),
        catchError((err) => {
          console.log('[getMessageChatEpic] -> getDialog error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const getChats: Epic = (action$, _, { chatApi }) =>
  action$.pipe(
    ofAsyncAction(getChatsAction),
    mergeMap(({ done, failed }) => {
      return chatApi.getChats().pipe(
        mergeMap((dataChats) => {
          return of(done(dataChats));
        }),
        catchError((err) => {
          console.log('[getChats] -> error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const createChat: Epic = (action$, _, { chatApi, history }) =>
  action$.pipe(
    ofAsyncAction(getCreateChatAction),
    mergeMap(({ payload, done, failed }) => {
      return chatApi.getOrCreatePersonalChat(payload).pipe(
        mergeMap((chat) => {
          history.push(`/chat/${chat.id}`);
          return of(done(chat));
        }),
        catchError((err) => {
          console.log('[createChatEpic] -> error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const sendMessage: Epic = (action$, _, { chatApi }) =>
  action$.pipe(
    ofAsyncAction(sendMessageAction),
    mergeMap(({ payload, done, failed }) => {
      return chatApi.sendMessage(payload).pipe(
        mergeMap((message: MessageEntity) => of(done(message))),
        catchError((err) => {
          console.log('[sendMessageEpic] -> error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const getDialog: Epic = (action$, store$, { chatApi }) =>
  action$.pipe(
    ofAsyncAction(getDialogAction),
    mergeMap(({ payload, meta, done, failed }) => {
      return chatApi.getDialog(payload).pipe(
        mergeMap((dataDialog) => {
          const actions: AnyAction[] = [done(dataDialog)];
          if (dataDialog.type === ChatType.PERSONAL && dataDialog.target) {
            actions.push(getByTargetInviteEventAction.started(dataDialog.target.id));
          }
          const chatItem = getChatListItemByIdSelector(store$.value, payload);
          if (meta?.withRead && R.last(dataDialog.messages)?.id !== chatItem?.lastReadId) {
            return of(...actions, readChatAction.started(payload));
          }
          return of(...actions);
        }),
        catchError((err) => {
          console.log('[getDialogEpic] -> error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

const inviteEventEpic: Epic = (action$, _, { chatApi, history }) =>
  action$.pipe(
    ofActionWithMeta(inviteEventAction.done),
    mergeMap(({ payload, meta }) => {
      if (meta && meta.chatNavigate) {
        return chatApi.getOrCreatePersonalChat(payload.result.target.id).pipe(
          mergeMap((chat) => {
            history.push(`/chat/${chat.id}`);
            return of();
          }),
          catchError((err) => {
            console.log('[changeInviteStatusEpic] -> getOrCreatePersonalChat error: %o', err);
            return of();
          }),
        );
      }
      return of();
    }),
  );

const forwardMessagesEpic: Epic = (action$, _, { chatApi }) =>
  action$.pipe(
    ofAsyncAction(forwardMessagesAction),
    mergeMap(({ payload, done, failed }) => {
      return chatApi.forwardMessages(payload).pipe(
        mergeMap(() => of(done())),
        catchError((err) => {
          console.log('[forwardMessagesEpic] -> error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

export const paginationChatEpic: Epic = (action$, _, { chatApi }) =>
  action$.pipe(
    ofAsyncAction(paginationMessagesAction),
    mergeMap(({ payload, done, failed }) => {
      return chatApi.paginationChat(payload).pipe(
        mergeMap((data) => {
          return of(done({ messages: data, chatId: payload.chatId }));
        }),
        catchError((err) => {
          console.log('[paginationMessagesEpic] -> error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

const readChatEpic: Epic = (action$, _, { chatApi }) =>
  action$.pipe(
    ofAsyncAction(readChatAction),
    mergeMap(({ payload, done, failed }) => {
      return chatApi.readChatById(payload).pipe(
        mergeMap((chat) => of(done(chat))),
        catchError((err) => {
          console.log('[readChatEpic] -> error: %o', err);
          return of(failed(err));
        }),
      );
    }),
  );

const getChatsLoadingEpic = createAsyncSingleLoadingEpic(getChatsAction, 'getChats');
const getDialogLoadingEpic = createAsyncSingleLoadingEpic(getChatsAction, 'getDialog');

export const ChatEpics = combineEpics(
  getMessageChatEpic,
  getChats,
  createChat,
  sendMessage,
  getDialog,
  inviteEventEpic,
  forwardMessagesEpic,
  readChatEpic,
  getChatsLoadingEpic,
  getDialogLoadingEpic,
  paginationChatEpic,
);
