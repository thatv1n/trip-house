import { UserEntity } from '@/types';

export function getUserName({ firstName, lastName, login }: UserEntity): string {
  return firstName && lastName ? `${firstName} ${lastName}` : login;
}

export function getUserShortName({ firstName, lastName, login }: UserEntity): string {
  return firstName && lastName ? `${firstName} ${lastName[0]}` : login;
}
