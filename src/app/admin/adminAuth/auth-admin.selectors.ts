import { createSelector } from 'reselect';
import { AuthAdminState } from './auth-admin.types';

export const authAdminSelector = <T extends { authA: AuthAdminState }>(state: T) => state.authA;
export const isLoginAdminSelector = createSelector(authAdminSelector, ({ isLoginA }) => isLoginA);
export const getAdminSelector = createSelector(authAdminSelector, ({ user }) => user);
export const getSessionAdminSelector = createSelector(authAdminSelector, ({ session }) => session);
export const getGeoAdminSelector = createSelector(authAdminSelector, ({ geoIp }) => geoIp);
