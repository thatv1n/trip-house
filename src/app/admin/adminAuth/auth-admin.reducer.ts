import { getIpAdminAction, loginAdminAction, profileAuthAdminAction } from '@/admin/adminAuth/auth-admin.action';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AuthAdminState } from './auth-admin.types';

const initialState: AuthAdminState = {
  session: null,
  user: null,
  isLoginA: false,
  geoIp: null,
};

export const authAdminReducer = reducerWithInitialState(initialState)
  .case(loginAdminAction.done, (state, { result: { user, session } }) => ({
    ...state,
    user,
    session,
    isLoginA: true,
  }))
  .case(profileAuthAdminAction.done, (state, { result: { user, session } }) => ({
    ...state,
    user,
    session,
    isLoginA: true,
  }))
  .case(getIpAdminAction.done, (state, { result }) => ({
    ...state,
    geoIp: { lat: result.lat, lon: result.lon, country: result.country },
  }));
