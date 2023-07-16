/* eslint-disable react/require-default-props */
import { FC, ReactNode } from 'react';
import { MessageEntity } from '../../chat.types';
import { MessageFromContainer } from './messageFromContainer';
import { MessageToContainer } from './messageToContainer';

interface MessageContainerPickerProps {
  children: ReactNode;
  isSender: boolean;
  message: MessageEntity;
  lastElem: any;
  handleUp: () => void;
  handleDown: () => void;
  isMessageSelection: boolean;
  selectMessage: (data: any) => void;
  typeSend?: 'forward';
}

export const MessageContainerPicker: FC<MessageContainerPickerProps> = ({
  children,
  isSender,
  message,
  lastElem,
  handleUp,
  handleDown,
  selectMessage,
  isMessageSelection,
  typeSend,
}) => {
  return isSender ? (
    <MessageToContainer
      lastElem={lastElem}
      message={message}
      handleDown={handleDown}
      handleUp={handleUp}
      isMessageSelection={isMessageSelection}
      selectMessage={selectMessage}
      typeSend={typeSend}
    >
      {children}
    </MessageToContainer>
  ) : (
    <MessageFromContainer
      lastElem={lastElem}
      message={message}
      handleDown={handleDown}
      handleUp={handleUp}
      selectMessage={selectMessage}
      isMessageSelection={isMessageSelection}
      typeSend={typeSend}
    >
      {children}
    </MessageFromContainer>
  );
};
