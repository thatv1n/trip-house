/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { getIpAction, logoutAuthAction } from '@/features/auth/auth.actions';
import { getGeoSelector, getSessionSelector, getUserSelector, isLogedinSelector } from '@/features/auth/auth.selectors';

import { Flex } from '../box';
import { Container } from '../grid';
import { Icon } from '../icon/icon';
import { Input } from '../input';
import { Typography } from '../typography';

import svgArrowLeftMobile from '#/icons/arrowLeftMobile.svg';
import svgArrowLeftMobileBlack from '#/icons/arrowLeftMobileBlack.svg';
import svgChat from '#/icons/chat.svg';
import svgPlus from '#/icons/plus.svg';
import svgProfile from '#/icons/profile.svg';
import svgSource from '#/icons/search-mddem.svg';
import svgSettings from '#/icons/settings.svg';
import { getChatsAction } from '@/features';
import { getEventsAction } from '@/features/home/home.page.action';
import { updateUserProfileAction } from '@/features/profile/profile.actions';
import { Lang } from '@/types';
import { getCountry, removeCountry, setCountry } from '@/utils';
import { T, useTolgee, useTranslate } from '@tolgee/react';
import { getCitiesAction } from '../eventsFilter/eventsFilter.action';
import { Link } from '../link';
import { NotificationMessages } from '../notificationMessages';
import { Select } from '../select';
import { getCountriesAction } from './header.actions';
import { getCountriesSelector } from './header.selectors';

const Logo = styled.div(({ theme }) => {
  return {
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: 10,
    backgroundColor: theme.color.mainPurple,
  };
});

const RootDesktop = styled.div(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    background: theme.color.white,
    marginBottom: '3rem',
    width: '100%',
    height: '6rem',
    '@media (max-width: 734px)': {
      display: 'none',
    },
  };
});

const RootMobile = styled.div(({ theme }) => {
  return {
    display: 'none',
    height: '4.4rem',
    width: '100%',
    background: theme.color.white,
    alignItems: 'center',
    marginBottom: '0.2rem',
    padding: '0 1.8rem',
    justifyContent: 'center',
  };
});

const WrapSvgLeft = styled.div(() => {
  return {
    position: 'absolute',
    left: '-0.1rem',
    top: 5,
    cursor: 'pointer',
    width: '2rem',
    height: '2rem',

    transition: ' 0.1s ease',
    '&:active': {
      opacity: 0.4,
    },
  };
});

const WrapSvgRight = styled.div(() => {
  return {
    position: 'absolute',
    right: 0,
    cursor: 'pointer',
    width: '2rem',
    height: '2rem',
    display: 'block',
    top: '0.3rem',
    transition: ' 0.1s ease',
    '&:active': {
      opacity: 0.4,
    },
  };
});

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslate();
  const { getLanguage, changeLanguage } = useTolgee();

  const { register } = useForm();
  const isLogedin = useSelector(isLogedinSelector);
  const { pathname } = useLocation();
  const [firstSegment, secondSegment] = pathname.split('/').filter((item) => !!item);

  const session = useSelector(getSessionSelector);
  const geo = useSelector(getGeoSelector);
  const user = useSelector(getUserSelector);
  const countries = useSelector(getCountriesSelector);

  const [title, setTitle] = useState('');
  const id = pathname.split('/').filter((item) => !!item)[1];

  const getCountryLocalStorage = getCountry();

  const handleLogout = (): void => {
    dispatch(logoutAuthAction.started());
    removeCountry();
  };

  const setCountryLocalStorage = (value: string) => {
    setCountry(value);
    dispatch(getCitiesAction.started(value));
    dispatch(getEventsAction.started({ limit: 20, offset: 0, country: value }));
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    changeLanguage(e.target.value);
    dispatch(updateUserProfileAction.started({ lang: e.target.value as Lang }));
  };

  useEffect(() => {
    if (geo?.country) {
      dispatch(getCitiesAction.started(getCountryLocalStorage));
    }
  }, [geo?.country]);

  useEffect(() => {
    if (session?.id) {
      dispatch(getIpAction.started());
      dispatch(getChatsAction.started());
      dispatch(getCountriesAction.started());
    }
  }, [session]);

  useEffect(() => {
    switch (firstSegment) {
      case '':
        setTitle(t('common.home', 'Главная'));
        break;
      case 'profile':
        if (secondSegment === 'settings') {
          setTitle(t('settings', 'Настройки'));
        } else if (secondSegment === 'events') {
          setTitle(t('common.events', 'Ивенты'));
        } else {
          setTitle(t('header.profile', 'Профиль'));
        }
        break;
      case 'about-the-event':
        if (secondSegment === 'map') {
          setTitle(t('header.map', 'Карта'));
        } else {
          setTitle('');
        }
        break;
      case 'create-event':
        setTitle(t('event.creation', 'Создание'));
        break;
      case 'chat':
        setTitle(secondSegment ? 'Диалог' : t('chat.list', 'Мои чаты'));
        break;
      default:
        setTitle('');
        break;
    }
  }, [pathname]);

  return (
    <>
      <RootDesktop>
        <Container display="flex" justifyContent="space-between" alignItems="center">
          <Flex>
            <Link to="/">
              <Logo />
            </Link>
            <Link
              css={{
                marginLeft: '1.4rem',
                marginRight: '4rem',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              to="/"
            >
              <Typography variant="h1">TripHouse</Typography>
            </Link>
            {isLogedin && (
              <Flex alignItems="center">
                <Select
                  blackArrow
                  css={(theme) => ({
                    height: '4.5rem',
                    border: 'none',
                    backgroundColor: theme.color.white,
                  })}
                  onChange={(e) => setCountryLocalStorage(e.target.value)}
                >
                  <option hidden>Выберите страну</option>
                  {countries?.map((item, i) => (
                    <option
                      key={i}
                      value={item}
                      selected={getCountryLocalStorage ? getCountryLocalStorage === item : false}
                    >
                      {item}
                    </option>
                  ))}
                </Select>
              </Flex>
            )}

            {!isLogedin && (
              <form>
                <Input
                  {...register('search')}
                  placeholder={t('common.search', 'Поиск')}
                  icon={<Icon css={{ width: '100%' }} source={svgSource} />}
                />
              </form>
            )}
          </Flex>
          <Flex>
            <Select css={{ backgroundPosition: '97% center' }} value={getLanguage()} onChange={handleLanguageChange}>
              <option value="en">{t('common.lang.en')}</option>
              <option value="ru-RU">{t('common.lang.ru')}</option>
              <option value="lv-LV">{t('common.lang.lv')}</option>
              <option value="de-DE">{t('common.lang.de')}</option>
            </Select>
          </Flex>
          <Flex>
            {isLogedin ? (
              <>
                <Flex css={{ cursor: 'pointer' }} onClick={() => navigate('/create-event')}>
                  <Icon css={{ width: '2rem', height: '2rem', marginRight: '1rem' }} source={svgPlus} />
                  <Typography css={{ marginRight: '4.2rem' }} variant="body1">
                    <T keyName="header.create">Создать</T>
                  </Typography>
                </Flex>
                <Flex css={{ cursor: 'pointer', position: 'relative' }} onClick={() => navigate('/chat')}>
                  <NotificationMessages />
                  <Icon css={{ width: '2rem', height: '2rem', marginRight: '1rem' }} source={svgChat} />
                  <Typography css={{ cursor: 'pointer', marginRight: '4.2rem' }} variant="body1">
                    <T keyName="header.chats">Чаты</T>
                  </Typography>
                </Flex>
                <Link to="/profile">
                  <Flex css={{ cursor: 'pointer' }}>
                    <Icon css={{ width: '2rem', height: '2rem', marginRight: '1rem' }} source={svgProfile} />
                    <Typography css={{ cursor: 'pointer', marginRight: '4.2rem' }} variant="body1">
                      <T keyName="header.profile">Профиль</T>
                    </Typography>
                  </Flex>
                </Link>
                <Flex>
                  <Typography css={{ cursor: 'pointer' }} variant="body1" onClick={handleLogout}>
                    Выйти
                  </Typography>
                </Flex>
              </>
            ) : (
              <Typography variant="body1">Ru En Lv</Typography>
            )}
          </Flex>
        </Container>
      </RootDesktop>
      <RootMobile
        css={
          isLogedin && {
            '@media (max-width: 734px)': {
              display: title !== 'Диалог' ? 'flex' : 'none',
            },
          }
        }
      >
        <Flex justifyContent="center" css={{ width: '100%', position: 'relative' }}>
          <Flex>
            {title !== t('common.home', 'Главная') && (
              <WrapSvgLeft onClick={() => navigate(-1)}>
                <Icon
                  source={firstSegment !== 'about-the-event' ? svgArrowLeftMobile : svgArrowLeftMobileBlack}
                  css={{ width: '0.9rem', height: '1.7rem' }}
                />
              </WrapSvgLeft>
            )}
            <Typography css={{ fontSize: '2.2rem', fontWeight: 500, height: '2.5rem' }}>
              {title === t('settings', 'Настройки') ? <T keyName="settings">Настройки</T> : title}
            </Typography>
          </Flex>

          {title === t('header.profile', 'Профиль') && user?.id === id && (
            <WrapSvgRight onClick={() => navigate('profile/settings')}>
              <Icon source={svgSettings} css={{ width: '2rem' }} />
            </WrapSvgRight>
          )}
        </Flex>
      </RootMobile>
    </>
  );
};
