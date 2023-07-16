/* eslint-disable react/require-default-props */
import { AudioPlayer, Box, Flex, Typography } from '@/components';
import { getUserSelector } from '@/features/auth/auth.selectors';
import { getChatAudioUrl, getDefaultPictureUrl, getUserName } from '@/utils';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MessageEntity, MessageType } from '../../chat.types';
import { InviteComponent } from '../inviteComponent';
import { MessageContainerPicker } from './messageContainerPicker';
import { MessagePicture } from './messagePicture';
import { MessageText } from './messageText';
import { Avatar } from './styled';

interface MessageSwitcherProps {
  message: MessageEntity;
  userId: string | undefined;
  lastElem: any;
  handleUp: () => void;
  handleDown: () => void;
  isMessageSelection: boolean;
  selectMessage: (data: any) => void;
  typeSend?: 'forward';
}

export const MessageSwitcher: FC<MessageSwitcherProps> = ({
  message,
  userId,
  lastElem,
  handleUp,
  handleDown,
  isMessageSelection,
  selectMessage,
  typeSend,
}) => {
  const { type, text, sender } = message;
  const isSender = sender.id === userId;

  // console.log('isSender: %o, message: %o', isSender, text);
  const user = useSelector(getUserSelector);
  switch (type) {
    case MessageType.TEXT:
      return (
        <MessageContainerPicker
          lastElem={lastElem}
          isSender={isSender}
          message={message}
          handleDown={handleDown}
          handleUp={handleUp}
          selectMessage={selectMessage}
          isMessageSelection={isMessageSelection}
          typeSend={typeSend}
        >
          <MessageText>{text!}</MessageText>
        </MessageContainerPicker>
      );
    case MessageType.PICTURES:
      return (
        <MessageContainerPicker
          lastElem={lastElem}
          isSender={isSender}
          message={message}
          handleDown={handleDown}
          handleUp={handleUp}
          selectMessage={selectMessage}
          isMessageSelection={isMessageSelection}
          typeSend={typeSend}
        >
          <MessagePicture message={message} />
        </MessageContainerPicker>
      );
    case MessageType.AUDIO:
      return (
        <MessageContainerPicker
          lastElem={lastElem}
          isSender={isSender}
          message={message}
          handleDown={handleDown}
          handleUp={handleUp}
          selectMessage={selectMessage}
          isMessageSelection={isMessageSelection}
          typeSend={typeSend}
        >
          <AudioPlayer urlVoice={getChatAudioUrl(message.audioUrl!)} messageId={message.id} />
        </MessageContainerPicker>
      );
    case MessageType.INVITE_EVENT:
      return <InviteComponent message={message} isSender={isSender} />;
    case MessageType.NOTE:
      return <Typography>{message.note}</Typography>;
    case MessageType.FORWARD:
      return (
        <Flex
          flexDirection="column"
          css={(theme: { color: { lightGray5: string } }) =>
            message.sender.id !== user?.id
              ? {
                  marginLeft: '3.5rem',
                  paddingLeft: '1rem',
                  paddingTop: '1rem',
                  borderLeft: `1px solid ${theme.color.lightGray5}`,
                }
              : {
                  marginRight: '3.5rem',
                  paddingRight: '1rem',
                  paddingTop: '1rem',
                  borderRight: `1px solid ${theme.color.lightGray5}`,
                }
          }
        >
          <Flex css={message.sender.id === user?.id && { justifyContent: 'flex-end' }}>
            {message.sender.id !== user?.id && (
              <Link to={`/profile/${message.forward!.sender.id}`}>
                <Avatar url={getDefaultPictureUrl(message.forward!.sender.avatar)} />
              </Link>
            )}
            <Flex mb="0.6rem">
              <Link to={`/profile/${message.forward!.sender.id}`}>
                <Typography
                  fontSize="1.6rem"
                  fontWeight="500"
                  color="mainPurple"
                  css={{
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {getUserName(message.forward!.sender)}
                </Typography>
              </Link>
              <Typography />
              <Typography fontSize="1.6rem" fontWeight="400" marginLeft="1.4rem" color="lightGray5">
                {dayjs(message.forward!.createdAt).format('HH:mm')}
              </Typography>
            </Flex>
          </Flex>
          <Box
            css={
              message.sender.id !== user?.id
                ? { position: 'relative', left: '4.7rem', top: '-2rem' }
                : { position: 'relative', top: '-1rem' }
            }
          >
            <MessageSwitcher
              message={message.forward!}
              userId={userId}
              lastElem={lastElem}
              handleUp={handleUp}
              handleDown={handleDown}
              selectMessage={selectMessage}
              isMessageSelection={isMessageSelection}
              typeSend="forward"
            />
          </Box>
        </Flex>
      );
    default:
      return null;
  }
};
