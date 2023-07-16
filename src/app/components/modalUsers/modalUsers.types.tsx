import { UserType } from '@/features/aboutEvent/event.types';
import { ChatListItemEntity } from '@/features/chat/chat.types';
import { ReactNode } from 'react';

export interface ModalusersType {
  isModalClose: (e: any, typeModal?: string) => void;
  users?: UserType[] | [];
  title: ReactNode;
  createChat?: (id: string) => void;
  forwardingMessages?: (id: string) => void;
  chats?: ChatListItemEntity[];
}
