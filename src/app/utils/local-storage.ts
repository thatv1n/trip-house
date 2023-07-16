import { UserOldSession } from '@/features/auth/auth.types';
import { ChatListLs } from '@/features/chat/chat.types';

const SESSION_OLD_USERS = 'sessionUsers';
const NOTIFICATION_CHAT = 'notification';
const COUNTRY = 'country';

export function getUserOldSessions(): UserOldSession[] {
  return JSON.parse(localStorage.getItem(SESSION_OLD_USERS) || '[]');
}

export function setUserOldSessions(users: UserOldSession[]): void {
  localStorage.setItem(SESSION_OLD_USERS, JSON.stringify(users));
}

export function getChatNotifications(): ChatListLs[] {
  return JSON.parse(localStorage.getItem(NOTIFICATION_CHAT) || '[]');
}

export function setChatNotifications(chats: ChatListLs[]): void {
  localStorage.setItem(NOTIFICATION_CHAT, JSON.stringify(chats));
}

export function getCountry(): string {
  return localStorage.getItem(COUNTRY) || '';
}

export function setCountry(value: string): void {
  localStorage.setItem(COUNTRY, value);
}

export function removeCountry(): void {
  localStorage.removeItem(COUNTRY);
}
