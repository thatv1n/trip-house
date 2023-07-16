import React from 'react';

import { MessageEntity } from '@/features/chat/chat.types';
import { MessageSwitcher } from './messageSwitcher';

interface MessageProps {
  message: MessageEntity;
  userId: string | undefined;
  lastElem: any;
  handleUp: () => void;
  handleDown: () => void;
  isMessageSelection: boolean;
  selectMessage: (data: any) => void;
}

export const Message: React.FC<MessageProps> = ({
  message,
  userId,
  lastElem,
  handleUp,
  handleDown,
  isMessageSelection,
  selectMessage,
}) => {
  return (
    <MessageSwitcher
      message={message}
      userId={userId}
      lastElem={lastElem}
      handleDown={handleDown}
      handleUp={handleUp}
      isMessageSelection={isMessageSelection}
      selectMessage={selectMessage}
    />
  );
};
