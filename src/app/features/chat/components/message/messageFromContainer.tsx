/* eslint-disable react/require-default-props */
import { Flex, Link, Typography } from '@/components';
import { getDefaultPictureUrl, getUserName } from '@/utils';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Theme } from 'styled-system';
import { MessageEntity } from '../../chat.types';
import { Avatar, Root } from './styled';

interface MessageFromContainerProps {
  message: MessageEntity;
  lastElem: any;
  children: ReactNode;
  handleUp: () => void;
  handleDown: () => void;
  isMessageSelection: boolean;
  selectMessage: (data: any) => void;
  typeSend?: 'forward';
}

const cssLabel = (theme: Theme) => {
  return {
    display: 'inline-flex',
    userSelect: 'none',
    cursor: 'pointer',
    marginBottom: '1rem',
    '&:before': {
      content: '""',
      display: 'inline-block',
      width: '2.4rem',
      minWidth: '2.4rem',
      height: '2.4rem',
      margin: '0.6rem  1rem 0 0',
      border: `1px solid ${theme.color.lightGray}`,
      borderRadius: '50px',
    },
  };
};

export const MessageFromContainer = ({
  children,
  message,
  lastElem,
  handleUp,
  handleDown,
  isMessageSelection,
  selectMessage,
  typeSend,
}: MessageFromContainerProps) => {
  const { sender, createdAt, id } = message;

  const title = getUserName(sender);
  return !typeSend ? (
    <Root
      ref={lastElem}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onTouchStart={handleDown}
      onTouchEnd={handleUp}
      onClick={() => selectMessage(id)}
      css={isMessageSelection ? cssLabel : typeSend && { justifyContent: 'flex-end', maxWidth: '90.5rem', margin: '0' }}
      as="label"
      htmlFor={id}
    >
      <Link to={`/profile/${sender.id}`}>
        <Avatar url={getDefaultPictureUrl(sender.avatar)} />
      </Link>
      <Flex flexDirection="column">
        <Flex>
          <Link to={`/profile/${sender.id}`}>
            <Typography
              fontSize="1.6rem"
              fontWeight="500"
              color="mainPurple"
              css={{
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {title}
            </Typography>
          </Link>
          <Typography fontSize="1.6rem" fontWeight="400" marginLeft="1.4rem" color="lightGray5">
            {dayjs(createdAt).format('HH:mm')}
          </Typography>
        </Flex>
        {children}
      </Flex>
    </Root>
  ) : (
    <Root ref={lastElem} css={{ marginTop: '0.5rem', marginBottom: '-1rem' }}>
      <Flex flexDirection="column">{children}</Flex>
    </Root>
  );
};
