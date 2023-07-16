/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { formatDistance } from 'date-fns';
import ru from 'date-fns/esm/locale/ru/index';
import React from 'react';
import { useSelector } from 'react-redux';

import { Flex, Link, Typography } from '@/components';
import { getUserSelector } from '@/features/auth/auth.selectors';
import { ChatListItemEntity, ChatType, MessageType } from '@/features/chat/chat.types';
import { getDefaultPictureUrl, getUserName, getUserShortName } from '@/utils';

interface TypeProps {
  chat: ChatListItemEntity;
}

const Root = styled.div(({ theme }) => {
  return {
    display: 'flex',
    cursor: 'pointer',
    height: '6.4rem',
    padding: '0.5rem 0 0 1.4rem',
    transition: 'all 0.1s ease',
    position: 'relative',
    '&:hover': {
      background: theme.color.backgroundHover,
    },
  };
});

const Avatar = styled.div<{ url: string }>((url) => {
  return {
    width: 50,
    height: 50,
    borderRadius: '50%',
    marginRight: '1.5rem',
    minWidth: 50,
    marginBottom: 16,
    background: `url(${url.url})    center / cover  no-repeat`,
  };
});

const NewMessageNote = styled.div(({ theme }) => {
  return {
    position: 'absolute',
    width: '.6rem',
    height: '.6rem',
    top: '3rem',
    right: '3rem',
    backgroundColor: theme.color.mainPurple,
    borderRadius: '50%',
  };
});

function getLastMessageTitle(chat: ChatListItemEntity, userId?: string): string {
  const { lastMessage: message, type } = chat;
  if (!message) {
    return 'Сообщений нет';
  }
  let result = '';
  if (message.sender.id === userId) {
    result = 'Вы: ';
  } else if (type === ChatType.EVENT) {
    result = `${getUserShortName(message.sender)}.: `;
  }
  switch (message.type) {
    case MessageType.TEXT:
      result += message.text;
      break;
    case MessageType.PICTURES:
      result += 'Pictures';
      break;
    case MessageType.AUDIO:
      result += 'Audio';
      break;
    default:
      return '';
  }
  return result;
}

export const Contact: React.FC<TypeProps> = ({ chat }) => {
  const user = useSelector(getUserSelector);

  const currentTime = new Date();

  const lastMessage = getLastMessageTitle(chat, user?.id);
  const title = chat.type === ChatType.PERSONAL ? getUserName(chat.target!) : chat.event?.title;

  return (
    <Link to={`/chat/${chat.id}`}>
      <Root>
        <Avatar
          url={getDefaultPictureUrl(chat.type === ChatType.PERSONAL ? chat.target?.avatar : chat.event?.pictures)}
        />
        <Flex flexDirection="column">
          <Typography
            fontSize="1.6rem"
            fontWeight="500"
            mt="0.7rem"
            css={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '23.3rem',
              minWidth: '21.3rem',
              appearance: 'none',
            }}
          >
            {title}
          </Typography>
          <Flex mt="0.8rem">
            <Typography
              fontSize="1.4rem"
              fontWeight="400"
              css={(theme: { color: { lightGray5: string } }) => ({
                color: theme.color.lightGray5,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '19.3rem',
                minWidth: '19.3rem',
                appearance: 'none',
                overflow: 'hidden',
                '@media (max-width: 1372px)': { maxWidth: '16.3rem', minWidth: '16.3rem' },
                '@media (max-width: 1024px)': { maxWidth: '11.3rem', minWidth: '11.3rem' },
              })}
            >
              {chat.lastMessage ? lastMessage : 'Сообщений нет'}
            </Typography>
            <Typography
              fontSize="1.4rem"
              fontWeight="400"
              css={(theme: { color: { lightGray5: string } }) => ({
                color: theme.color.lightGray5,
                marginLeft: '1.8rem',
                whiteSpace: 'nowrap',
              })}
            >
              {chat.lastMessage &&
                formatDistance(new Date(`${chat.lastMessage.createdAt}`), currentTime, {
                  addSuffix: true,
                  locale: ru,
                })}
            </Typography>
          </Flex>
        </Flex>
        {chat.countUnread > 0 && <NewMessageNote />}
      </Root>
    </Link>
  );
};
