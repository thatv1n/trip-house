/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-catch */
import styled from '@emotion/styled';
import { T } from '@tolgee/react';
import { formatDistance } from 'date-fns';
import ru from 'date-fns/esm/locale/ru/index';
import dayjs from 'dayjs';
import React from 'react';

import { Button, Flex, Link, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';
import { Option } from '@/types';

import svgArrowLeftMobile from '#/icons/arrowLeftMobile.svg';
import svgClose from '#/icons/closeGray.svg';
import svgDots from '#/icons/dots-horizontal.svg';

export interface HeaderCompanionProps {
  navigateUrl: string;
  pictureUrl: string;
  onlineStatus: Option<Date>;
  sex: Option<string>;
  title: string;
  selectedMessages: string[];
  isMessageSelection: boolean;
  setSelectedMessages: (data: any) => void;
  setIsMessageSelection: (data: any) => void;
  setModal: (data: boolean) => void;
  membersCount: number;
}

const WrapSvgLeft = styled.div(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    width: '2rem',
    height: '100%',
    marginRight: '2.5rem',
    transition: ' 0.1s ease',
    '&:active': {
      opacity: 0.4,
    },
  };
});

const Root = styled.div(() => {
  return {
    display: 'flex',
    cursor: 'pointer',
  };
});

const Avatar = styled.div<{ url: string }>((url) => {
  return {
    width: 36,
    cursor: 'pointer',
    height: 36,
    borderRadius: '50%',
    background: `url(${url.url})    center / cover  no-repeat`,
  };
});

const WrapSvgRight = styled.div(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    width: '2rem',
    height: '100%',
    marginRight: '1.8rem',
    transition: ' 0.1s ease',
    '&:active': {
      opacity: 0.4,
    },
  };
});

const WrapCountSelectedMess = styled.div(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.6rem',
    cursor: 'pointer',
  };
});

function getStatus(onlineStatus: Option<Date>, sex: Option<string>): Option<string> {
  if (!onlineStatus || !sex) {
    return null;
  }
  const lastOnlineFormatted = dayjs(onlineStatus).format('DD-MM-YYYY HH:mm');
  const currentTimeFormatted = dayjs(new Date()).format('DD-MM-YYYY HH:mm');

  if (lastOnlineFormatted === currentTimeFormatted) {
    return 'online';
  }
  return `${sex === 'male' ? 'был' : 'была'} в сети ${formatDistance(new Date(`${onlineStatus}`), new Date(), {
    addSuffix: true,
    locale: ru,
  })}`;
}

export const HeaderCompanion: React.FC<HeaderCompanionProps> = ({
  navigateUrl,
  pictureUrl,
  onlineStatus,
  sex,
  title,
  selectedMessages,
  isMessageSelection,
  setSelectedMessages,
  setIsMessageSelection,
  setModal,
  membersCount,
}) => {
  const status = getStatus(onlineStatus, sex);

  const resetSelectedMessages = (): void => {
    setSelectedMessages([]);
    setIsMessageSelection(false);
  };

  const countMessagesSelected =
    selectedMessages.length && selectedMessages.length === 1
      ? `${selectedMessages.length} Сообщение`
      : selectedMessages.length > 1 && selectedMessages.length <= 4
      ? `${selectedMessages.length} Сообщения`
      : selectedMessages.length > 4 && `${selectedMessages.length} Сообщений`;

  return (
    <Flex alignItems="center" justifyContent="space-between" css={{ width: '100%' }}>
      {!isMessageSelection ? (
        <>
          <Link to="/chat">
            <WrapSvgLeft>
              <Icon source={svgArrowLeftMobile} css={{ width: '0.9rem', height: '1.6rem' }} />
            </WrapSvgLeft>
          </Link>
          <Root>
            <Link to={navigateUrl}>
              <Flex flexDirection="column">
                <Typography fontSize="1.6rem" fontWeight="500" mb="0.2rem" mt="0.3rem" textAlign="center">
                  {title}
                </Typography>

                {sex ? (
                  <Typography
                    fontSize="1.4rem"
                    fontWeight="400"
                    css={(theme: { color: { lightGray5: string } }) => ({
                      color: theme.color.lightGray5,
                      textAlign: 'center',
                    })}
                  >
                    {status}
                  </Typography>
                ) : (
                  <Typography
                    fontSize="1.4rem"
                    fontWeight="400"
                    css={(theme: { color: { lightGray5: string } }) => ({
                      color: theme.color.lightGray5,
                      textAlign: 'center',
                    })}
                  >
                    {membersCount} {membersCount === 1 ? 'участник' : <T keyName="participants">участников</T>}
                  </Typography>
                )}
              </Flex>
            </Link>
          </Root>
          <Flex alignItems="center">
            <WrapSvgRight>
              <Icon source={svgDots} css={{ width: '2.4rem' }} />
            </WrapSvgRight>
            <Link to={navigateUrl}>
              <Avatar url={pictureUrl} />
            </Link>
          </Flex>
        </>
      ) : (
        <Flex justifyContent="space-between" css={{ width: '100%' }}>
          <WrapCountSelectedMess onClick={resetSelectedMessages}>
            {countMessagesSelected || 'Отменить'}
            <Icon source={svgClose} css={{ width: '1.2rem', marginLeft: '1.8rem' }} />
          </WrapCountSelectedMess>
          <Button onClick={() => setModal(true)}>Переслать</Button>
        </Flex>
      )}
    </Flex>
  );
};
