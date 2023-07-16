import { ResponseError } from '@/types';
import actionCreatorFactory from 'typescript-fsa';
import { AuthSmsEntity, ConfirmSmsPayload, IpResponse, LoginPayload, RegisterPayload } from './auth.types';

const actionCreator = actionCreatorFactory('[AUTH]');

export const loginAuthAction = actionCreator<LoginPayload>('SEND_SMS');

export const sendSmsAuthAction = actionCreator.async<string, AuthSmsEntity, ResponseError>('SEND_SMS');
export const confirmSmsAuthAction = actionCreator.async<ConfirmSmsPayload, LoginPayload, ResponseError>('CONFIRM_SMS');
export const getAuthAction = actionCreator.async<string, AuthSmsEntity, ResponseError>('GET_AUTH');
export const registerAuthAction = actionCreator.async<RegisterPayload, LoginPayload, ResponseError>('REGISTER');
export const profileAuthAction = actionCreator.async<void, LoginPayload, ResponseError>('PROFILE');
export const logoutAuthAction = actionCreator.async<void, void, ResponseError>('LOGOUT');
export const getIpAction = actionCreator.async<void, IpResponse, ResponseError>('GET_GEO');
