import { MessageEntity } from '../../chat.types';

export interface TypeMessageProps {
  isSender: boolean;
  message: MessageEntity;
  lastElem: any;
}
