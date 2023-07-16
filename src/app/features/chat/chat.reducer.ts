import * as R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  getChatsAction,
  getDialogAction,
  getMessageChatAction,
  paginationMessagesAction,
  readChatAction,
} from './chat.actions';
import { ChatEntity, ChatFull, ChatState, GetMessageDonePayload, MessageEntity } from './chat.types';

const initialState: ChatState = {
  chat: {},
  chatListIds: [],
  messages: {},
  chatsFull: {},
  countUnread: 0,
};

const getChatFullByEntity = R.compose<[ChatEntity], ChatEntity & { messageIds: string[] }, ChatFull>(
  R.omit(['messages']),
  (chat) => ({ ...chat, messageIds: R.map(R.prop('id'), chat.messages) }),
);

const normalizeMessages = R.indexBy<MessageEntity, string>(R.prop('id'));

const sortChatList = (state: ChatState): ChatState => {
  const { chat } = state;
  return R.assoc(
    'chatListIds',
    R.compose<[ChatState], string[], string[], string[]>(
      R.reverse,
      R.sortBy((id) => {
        const chatItem = chat[id];
        return chatItem.lastMessage !== null ? chatItem.lastMessage.createdAt : chatItem.updatedAt;
      }),
      R.prop('chatListIds'),
    )(state),
    state,
  );
};

const getCountUnread = (state: ChatState): number => {
  return R.compose<[ChatState], string[], number[], number>(
    R.sum,
    R.map((id) => state.chat[id]?.countUnread ?? 0),
    R.prop('chatListIds'),
  )(state);
};

const calculateCountUnread = (state: ChatState): ChatState => {
  return R.assoc('countUnread', getCountUnread(state), state);
};

const getMessageDone = (state: ChatState, { message, chat }: GetMessageDonePayload): ChatState =>
  R.compose<[ChatState], ChatState, ChatState>(
    R.assocPath(['messages', message.id], message),
    R.when<ChatState, ChatState>(
      R.compose(R.not, R.has(message.id), R.prop('messages')),
      R.compose(
        R.when<ChatState, ChatState>(
          R.compose<[ChatState], ChatState['chatsFull'], boolean>(R.has(message.chatId), R.prop('chatsFull')),
          R.over(
            R.lensPath(['chatsFull', message.chatId]),
            R.assoc('messageIds', R.append(message.id, state.chatsFull[message.chatId]?.messageIds ?? [])),
          ),
        ),
        calculateCountUnread,
        sortChatList,
        R.assocPath(['chat', message.chatId], chat),
        R.when(
          R.compose<[ChatState], ChatState['chat'], boolean, boolean>(R.not, R.has(message.chatId), R.prop('chat')),
          R.over(R.lensProp('chatListIds'), R.append(message.chatId)),
        ),
      ),
    ),
  )(state);

export const chatReducer = reducerWithInitialState(initialState)
  .case(getMessageChatAction.done, (state, { result }) => getMessageDone(state, result))
  .case(getChatsAction.done, (state, { result }) =>
    R.compose<[ChatState], ChatState, ChatState, ChatState, ChatState>(
      calculateCountUnread,
      sortChatList,
      R.assoc('chatListIds', R.map(R.prop('id'), result)),
      R.assoc('chat', R.indexBy(R.prop('id'), result)),
    )(state),
  )
  .case(readChatAction.done, (state, { result }) =>
    R.compose<[ChatState], ChatState, ChatState>(calculateCountUnread, R.assocPath(['chat', result.id], result))(state),
  )
  .case(getDialogAction.done, (state, { result }) => ({
    ...state,
    chatsFull: R.assoc(result.id, getChatFullByEntity(result), state.chatsFull),
    messages: { ...state.messages, ...normalizeMessages(result.messages) },
  }))
  .case(paginationMessagesAction.done, (state, { result: { chatId, messages } }) => ({
    ...state,
    messages: { ...state.messages, ...normalizeMessages(messages) },
    chatsFull: {
      ...state.chatsFull,
      [chatId]: {
        ...state.chatsFull[chatId],
        messageIds: [...messages.map(R.prop('id')), ...state.chatsFull[chatId].messageIds],
      },
    },
  }));
