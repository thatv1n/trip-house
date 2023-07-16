import { createSelector } from 'reselect';
import { AuthState } from './auth.types';

export const authSelector = <T extends { auth: AuthState }>(state: T) => state.auth;

export const isLogedinSelector = createSelector(authSelector, ({ isLogedin }) => isLogedin);
export const getAuthSelector = createSelector(authSelector, ({ auth }) => auth);
export const getUserSelector = createSelector(authSelector, ({ user }) => user);
export const getGeoSelector = createSelector(authSelector, ({ geoIp }) => geoIp);
export const getSessionSelector = createSelector(authSelector, ({ session }) => session);
