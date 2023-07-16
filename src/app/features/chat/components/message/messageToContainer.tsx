/* eslint-disable react/require-default-props */
import { Flex, Typography } from '@/components';
import { getUserSelector } from '@/features/auth/auth.selectors';
import { getUserName } from '@/utils';
import dayjs from 'dayjs';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { MessageEntity } from '../../chat.types';
import { Root, Text } from './styled';

interface MessageToContainerProps {
  children: ReactNode;
  message: MessageEntity;
  lastElem: any;
  handleUp: () => void;
  handleDown: () => void;
  isMessageSelection: boolean;
  selectMessage: (data: any) => void;
  typeSend?: 'forward';
}

const cssLabel = (theme: Theme) => {
  return {
    display: 'flex',
    userSelect: 'none',
    justifyContent: 'flex-end',
    cursor: 'pointer',
    maxWidth: '90.5rem',
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

export const MessageToContainer: FC<MessageToContainerProps> = ({
  children,
  message,
  lastElem,
  handleUp,
  handleDown,
  isMessageSelection,
  selectMessage,
  typeSend,
}) => {
  const { sender, createdAt, id } = message;
  const title = getUserName(sender);
  const user = useSelector(getUserSelector);

  return !typeSend ? (
    <Root
      ref={lastElem}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onTouchStart={handleDown}
      onTouchEnd={handleUp}
      onClick={() => selectMessage(id)}
      css={
        isMessageSelection
          ? cssLabel
          : !typeSend
          ? { justifyContent: 'flex-end', maxWidth: '90.5rem', margin: '0' }
          : { justifyContent: 'flex-end', maxWidth: '90.5rem', margin: '0' }
      }
      htmlFor={id}
      as="label"
    >
      <Flex flexDirection="column">
        <Text css={{ maxWidth: '45rem', '@media (max-width: 734px)': { maxWidth: '33rem' } }} me>
          {children}
          <Typography
            fontSize="1.2rem"
            fontWeight="400"
            marginLeft="1.4rem"
            color="lightGray5"
            css={{
              position: 'absolute',
              right: 14,
              bottom: 9,
            }}
          >
            {dayjs(createdAt).format('HH:mm')}
          </Typography>
        </Text>
      </Flex>
    </Root>
  ) : (
    <Root ref={lastElem} css={{ marginTop: '1rem', marginBottom: '-1rem' }}>
      <Flex flexDirection="column">{children}</Flex>
    </Root>
  );
};
