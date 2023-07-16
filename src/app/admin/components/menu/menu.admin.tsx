import styled from '@emotion/styled';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Flex, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import { logoutAdminAction } from '@/admin/adminAuth/auth-admin.action';

import svgCreditCard from '#/icons/admin/credit-card-check.svg';
import svgAddFirms from '#/icons/admin/edit-05.svg';
import svgUsers from '#/icons/admin/face-happy.svg';
import svgLogout from '#/icons/admin/log-in-02.svg';
import svgSupportService from '#/icons/admin/message-question-square.svg';
import svgFirms from '#/icons/admin/notification-text.svg';
import svgSetting from '#/icons/admin/settings-01.svg';
import svgServices from '#/icons/admin/shopping-bag-03.svg';
import svgEvents from '#/icons/admin/zap.svg';
import { T } from '@tolgee/react';

const RootWrapper = styled.div(({ theme }) => {
  return {
    width: '32.4rem',
    height: '100%',
    background: theme.color.mainPurple,
    padding: '4rem 3.4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'fixed',
  };
});

const TextWrapper = styled.div(({ theme }) => {
  return {
    color: theme.color.white,
    fontSize: 16,
    marginLeft: 18,
    transition: 'opacity 0.5s easy-in-out',
    '&:hover': {
      opacity: 1,
    },
  };
});

const ItemMenu = styled.div(() => {
  return {
    marginBottom: 36,
    cursor: 'pointer',
    transition: 'opacity 0.5s easy-in-out',
    display: 'flex',
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
    },
  };
});

export const MenuAdmin: FC = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutAdminAction.started());
    navigate('/auth');
  };

  return (
    <RootWrapper>
      <Flex flexDirection="column">
        <Typography
          css={(theme: any) => ({
            color: theme.color.white,
            fontSize: '3.5rem',
            marginBottom: '6.2rem',
            textAlign: 'center',
          })}
        >
          Trip House
        </Typography>
        <ItemMenu
          css={(location === '/admin-panel' || location === '/admin-panel/categories') && { opacity: 1 }}
          onClick={() => navigate('/admin-panel')}
        >
          <Icon source={svgEvents} css={{ width: 16 }} />
          <TextWrapper>Ивенты</TextWrapper>
        </ItemMenu>
        <ItemMenu css={location === '/admin-panel/users' && { opacity: 1 }}>
          <Icon source={svgUsers} css={{ width: 16 }} />
          <TextWrapper>Пользователи</TextWrapper>
        </ItemMenu>
        <ItemMenu css={location === '/admin-panel/serivces' && { opacity: 1 }}>
          <Icon source={svgServices} css={{ width: 16 }} />
          <TextWrapper>Услуги фирм</TextWrapper>
        </ItemMenu>
        <ItemMenu css={location === '/admin-panel/firms' && { opacity: 1 }}>
          <Icon source={svgFirms} css={{ width: 16 }} />
          <TextWrapper>Фирмы</TextWrapper>
        </ItemMenu>
        <ItemMenu css={location === '/admin-panel/payments' && { opacity: 1 }}>
          <Icon source={svgCreditCard} css={{ width: 16 }} />
          <TextWrapper>Платежи</TextWrapper>
        </ItemMenu>
        <ItemMenu css={location === '/admin-panel/add-firms' && { opacity: 1 }}>
          <Icon source={svgAddFirms} css={{ width: 16 }} />
          <TextWrapper>Добавление фирмы</TextWrapper>
        </ItemMenu>
        <ItemMenu css={location === '/admin-panel/support-service' && { opacity: 1 }}>
          <Icon source={svgSupportService} css={{ width: 16 }} />
          <TextWrapper>Служба поддержки</TextWrapper>
        </ItemMenu>
      </Flex>
      <Flex flexDirection="column">
        <ItemMenu css={location === '/admin-panel/settings' && { opacity: 1 }}>
          <Icon source={svgSetting} css={{ width: 16 }} />
          <TextWrapper css={{ opacity: 0.5 }}>
            <T keyName="settings">Настройки</T>
          </TextWrapper>
        </ItemMenu>
        <ItemMenu css={{ opacity: 1 }} onClick={logout}>
          <Icon source={svgLogout} css={{ width: 16 }} />
          <TextWrapper css={{ opacity: 1 }}>Выйти</TextWrapper>
        </ItemMenu>
      </Flex>
    </RootWrapper>
  );
};
