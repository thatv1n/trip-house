import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { Flex } from '../box';
import { Icon } from '../icon/icon';
import { Typography } from '../typography';

import svgChats from '#/icons/chats.svg';
import svgCreateEvent from '#/icons/createEvent.svg';
import svgHome from '#/icons/home.svg';
import svgProfileMobile from '#/icons/profileMobile.svg';

import svgChatsActive from '#/icons/chatsActive.svg';
import svgCreateEventActive from '#/icons/createEventActive.svg';
import svgHomeActive from '#/icons/homeActive.svg';
import svgProfileMobileActive from '#/icons/profileActive.svg';
import { getUserSelector } from '@/features/auth/auth.selectors';
import { T } from '@tolgee/react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationMessages } from '../notificationMessages';

const RootMobile = styled.div(({ theme }) => {
  return {
    height: '7.5rem',
    width: '100%',
    background: theme.color.white,
    position: 'fixed',
    left: 0,
    bottom: '-0.2rem',
    display: 'none',
    padding: '1.2rem 3.5rem 2.7rem 3.6rem',
    borderTop: '0.5px solid #BCBCBC',
    // marginBottom: /iPhone|iPad|iPod/i.test(navigator.userAgent) && '5rem',
    '@media (max-width: 734px)': {
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 2,
    },
  };
});

export const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [firstSegment, secondSegment] = pathname.split('/').filter((item) => !!item);
  const [title, setTitle] = useState('');
  const user = useSelector(getUserSelector);

  useEffect(() => {
    if (firstSegment === 'profile') {
      if (secondSegment === 'settings') {
        setTitle('Профиль');
      } else if (secondSegment === 'events') {
        setTitle('Ивенты');
      } else {
        setTitle('Профиль');
      }
    } else if (firstSegment === 'about-the-event' || !firstSegment) {
      setTitle('Главная');
    } else if (firstSegment === 'create-event' && !secondSegment) {
      setTitle('Создать');
    } else if (firstSegment === 'chat') {
      setTitle('Мои контакты');
    }
  }, [pathname]);

  return (
    <RootMobile css={firstSegment === 'chat' && secondSegment && { display: 'none !important' }}>
      <Flex flexDirection="column" alignItems="center" onClick={() => navigate('/')}>
        <Icon
          source={title === 'Главная' ? svgHomeActive : svgHome}
          css={{ width: '1.8rem', marginBottom: '1.1rem' }}
        />
        <Typography
          variant="mini1"
          css={(theme: { color: { mainPurple: string } }) => title === 'Главная' && { color: theme.color.mainPurple }}
        >
          <T keyName="common.home">Главная</T>
        </Typography>
      </Flex>
      <Flex flexDirection="column" alignItems="center" onClick={() => navigate('/create-event')}>
        <Icon
          source={title === 'Создать' ? svgCreateEventActive : svgCreateEvent}
          css={{ width: '2rem', marginBottom: '1rem' }}
        />
        <Typography
          variant="mini1"
          css={(theme: { color: { mainPurple: string } }) => title === 'Создать' && { color: theme.color.mainPurple }}
        >
          <T keyName="header.create">Создать</T>
        </Typography>
      </Flex>
      <Flex flexDirection="column" alignItems="center" onClick={() => navigate('/chat')} css={{ position: 'relative' }}>
        <NotificationMessages />
        <Icon
          source={title === 'Мои контакты' ? svgChatsActive : svgChats}
          css={{ width: '2rem', marginBottom: '1rem' }}
        />
        <Typography
          variant="mini1"
          css={(theme: { color: { mainPurple: string } }) => title === 'Чаты' && { color: theme.color.mainPurple }}
        >
          <T keyName="header.chats">Чаты</T>
        </Typography>
      </Flex>
      <Flex flexDirection="column" alignItems="center" onClick={() => navigate(`/profile/${user?.id}`)}>
        <Icon
          source={title === 'Профиль' ? svgProfileMobileActive : svgProfileMobile}
          css={{ width: '1.6rem', marginBottom: '1.1rem' }}
        />
        <Typography
          variant="mini1"
          css={(theme: { color: { mainPurple: string } }) => title === 'Профиль' && { color: theme.color.mainPurple }}
        >
          <T keyName="header.profile">Профиль</T>
        </Typography>
      </Flex>
    </RootMobile>
  );
};
