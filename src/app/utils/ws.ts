import { getMessageChatAction } from '@/features';
import { loginAuthAction, logoutAuthAction, profileAuthAction } from '@/features/auth/auth.actions';
import { Option } from '@/types';
import { Dispatch, Middleware } from 'redux';
import { io, Socket } from 'socket.io-client';

let socket: Option<Socket> = null;

function init(dispatch: Dispatch, token: string): void {
  try {
    socket = io(__WS_URL__, { auth: { token } });
    socket.on('message', (message) => {
      dispatch(getMessageChatAction.started(message));
    });
  } catch (err) {
    console.log('wsInit err -> %o', err);
  }
}

function disconnect(): void {
  if (socket) {
    socket.disconnect();
  }
}

export const wsMiddleware: Middleware = (api) => (next) => (action) => {
  if (action.type === profileAuthAction.done.type) {
    init(api.dispatch, action.payload.result.session.id);
  } else if (action.type === loginAuthAction.type) {
    init(api.dispatch, action.payload.session.id);
  } else if (action.type === logoutAuthAction.done.type) {
    disconnect();
  }
  next(action);
};
