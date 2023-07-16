/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSelector } from 'reselect';
import { ChatState, ChatType } from './chat.types';

export const chatSelector = <T extends { chat: ChatState }>(state: T) => state.chat;

export const getMessagesSelector = createSelector(chatSelector, ({ messages }) => messages);
export const getChatsSelector = createSelector(chatSelector, ({ chat }) => chat);
export const getChatIdsSelector = createSelector(chatSelector, ({ chatListIds }) => chatListIds);
export const searchChatListSelector = createSelector(
  [chatSelector, (_, search) => search],
  ({ chatListIds, chat }, search) =>
    chatListIds
      .map((id) => chat[id])
      .filter((item) =>
        (item.type === ChatType.PERSONAL
          ? `${item.target?.firstName} ${item.target?.lastName} ${item.target?.login}`
          : `${item.event?.title}`
        )
          .toLowerCase()
          .includes(search),
      ),
);
export const getChatsFullSelector = createSelector(chatSelector, ({ chatsFull }) => chatsFull);
export const getChatFullByIdSelector = createSelector(
  [getChatsFullSelector, (_, chatId: string) => chatId],
  (chatsFull, chatId) => chatsFull[chatId],
);
export const getChatListItemByIdSelector = createSelector(
  [getChatsSelector, (_, chatId: string) => chatId],
  (chats, chatId) => chats[chatId],
);
export const getMessagesByChatIdSelector = createSelector(
  [getMessagesSelector, getChatFullByIdSelector, (_, chatId: string) => chatId],
  (messages, chat) => chat?.messageIds.map((id) => messages[id]) ?? [],
);

export const getCountUnreadSelector = createSelector([chatSelector], ({ countUnread }) => countUnread);
