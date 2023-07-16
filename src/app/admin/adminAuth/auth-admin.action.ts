import { IpResponse, LoginPayload } from '@/features/auth/auth.types';
import { ResponseError } from '@/types';
import actionCreatorFactory from 'typescript-fsa';
import { LoginAdminPayload } from './auth-admin.types';

const actionCreator = actionCreatorFactory('[AUTH_ADMIN]');

export const loginAdminAction = actionCreator.async<LoginAdminPayload, LoginPayload, ResponseError>('LOGIN');
export const profileAuthAdminAction = actionCreator.async<void, LoginPayload, ResponseError>('PROFILE');
export const logoutAdminAction = actionCreator.async<void, void, ResponseError>('LOGOUT');
export const getIpAdminAction = actionCreator.async<void, IpResponse, ResponseError>('GET_GEO');
