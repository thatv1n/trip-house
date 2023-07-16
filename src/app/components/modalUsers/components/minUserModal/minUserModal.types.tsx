import { UserType } from '@/features/aboutEvent/event.types';
import { ChatListItemEntity } from '@/features/chat/chat.types';

export interface minUserModalTypes {
  profile?: UserType;
  clickItem?: any;
  chat?: ChatListItemEntity;
}
