import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  getAuthAction,
  getIpAction,
  loginAuthAction,
  logoutAuthAction,
  profileAuthAction,
  sendSmsAuthAction
} from './auth.actions';
import { AuthState } from './auth.types';

const initialState: AuthState = {
  session: null,
  user: null,
  auth: null,
  isLogedin: false,
  geoIp: null,
};

export const authReducer = reducerWithInitialState(initialState)
  .case(loginAuthAction, (state, { user, session }) => ({ ...state, user, session, isLogedin: true }))
  .case(profileAuthAction.done, (state, { result: { user, session } }) => ({
    ...state,
    user,
    session,
    isLogedin: true,
  }))
  .case(logoutAuthAction.done, (state) => ({ ...state, user: null, session: null, isLogedin: false }))
  .case(getAuthAction.done, (state, { result }) => ({ ...state, auth: result }))
  .case(getIpAction.done, (state, { result }) => ({
    ...state,
    geoIp: { lat: result.lat, lon: result.lon, country: result.country },
  }))
  .case(sendSmsAuthAction.done, (state, { result }) => ({ ...state, auth: result }));
