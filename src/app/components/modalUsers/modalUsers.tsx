/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { FC, useEffect, useMemo, useState } from 'react';

import { Flex, Input, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgArrowLeftMobile from '#/icons/arrowLeftMobile.svg';
import svgClose from '#/icons/close.svg';
import svgSource from '#/icons/search-mddem.svg';

import { useNavigate } from 'react-router-dom';
import { MinUserModal } from './components';
import { ModalusersType } from './modalUsers.types';
import { useTranslate } from '@tolgee/react';

const WrapModalUsers = styled.div<{ countUsers: any }>(({ theme, countUsers }) => {
  return {
    position: countUsers <= 15 ? 'fixed' : 'absolute',
    width: '100%',
    height: countUsers <= 15 ? '100%' : '',
    paddingTop: '6rem',
    zIndex: '10',
    left: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::after': {
      content: "' '",
      position: 'absolute',
      backgroundColor: theme.color.transparentGray,
      width: '100%',
      height: '100%',
      paddingBottom: '100%',
      top: 0,
    },
    '@media (max-width: 734px)': {
      position: 'absolute ',
      borderRadius: 0,
      width: '100%',
      height: '100%',
      paddingTop: '0',
      marginBottom: '7.1rem',
    },
  };
});

const WinModalUsers = styled.div<{ countUsers: any }>(({ theme, countUsers, setModal }) => {
  return {
    minHeight: 300,
    maxWidth: 1191,
    height: countUsers <= 15 ? '84vh' : '',
    width: '100%',
    overflowY: 'hidden',
    top: 0,
    right: 0,
    overflowX: 'hidden',
    background: theme.color.white,
    zIndex: 2,
    borderRadius: 10,
    '&::-webkit-scrollbar': { width: 0 },
    '@media (max-width: 1200px)': {
      width: 968,
    },
    '@media (max-width: 980px)': {
      width: 770,
    },
    '@media (max-width: 734px)': {
      borderRadius: 0,
      width: '100%',
      height: '100%',
      position: 'fixed',
      overflow: 'scroll',
      background: theme.color.bg,
    },
  };
});

const WrapUsersProfiles = styled.div(() => {
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: '1fr',
    gridColumnGap: '0px',
    gridRowGap: '0px',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    '@media (max-width: 980px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      margin: '0 auto',
      marginBottom: '7.1rem',
    },
    '@media (max-width: 614px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  };
});

export const ModalUsers: FC<ModalusersType> = ({
  isModalClose,
  users,
  title,
  createChat,
  forwardingMessages,
  chats,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslate();

  const body = document.querySelector('body');
  const [search, setSearch] = useState<string>('');

  const filteredUsers = useMemo(() => {
    return users?.filter((item) => `${item.firstName} ${item.lastName} ${item.login}`.toLowerCase().includes(search));
  }, [search, users]);

  useEffect(() => {
    const handleOverflow = () => {
      if ((users && users.length <= 15 && body) || (chats && chats.length <= 15 && body)) {
        body.style.overflow = 'hidden';
      } else if (body) {
        body.style.overflow = 'auto';
      }
    };

    handleOverflow();
    return () => {
      if (body) body.style.overflow = 'auto';
    };
  }, [users, body, chats]);

  const clickItem = (id: string) => {
    if (createChat) {
      createChat(id);
    } else if (forwardingMessages) {
      forwardingMessages(id);
    } else {
      navigate(`/profile/${id}`);
      isModalClose('_', 'modalUser');
    }
  };

  return (
    <WrapModalUsers
      onClick={(e) => isModalClose(e)}
      data-target="wrapperModalMember"
      countUsers={users ? users?.length : chats?.length}
    >
      <WinModalUsers countUsers={users ? users?.length : chats?.length}>
        <Flex
          css={(theme: any) => ({
            padding: '1.8rem 3.2rem 1.8rem 7.1rem',
            width: '100%',
            borderBottom: `0.1rem solid ${theme.color.darkWhite}`,
            position: 'relative',
            justifyContent: 'space-between',
            '@media (max-width: 734px)': {
              justifyContent: 'center',
              background: theme.color.white,
              padding: '0.85rem 3.2rem 0.95rem  3.2rem',
              borderBottom: 'none',
            },
          })}
        >
          <Flex alignItems="center">
            <Typography
              variant="h1"
              css={{
                marginRight: '3rem',
                '@media (max-width: 734px)': {
                  marginRight: '0',
                },
              }}
            >
              {title}
            </Typography>
            <Flex css={{ '@media (max-width: 734px)': { display: 'none' } }}>
              <Input
                placeholder={t('common.search', 'Поиск')}
                css={{ height: '4rem', marginRight: '2rem' }}
                wth="34.3rem"
                onChange={(e: any) => setSearch(e.target.value.toLowerCase())}
                icon={<Icon css={{ width: '100%', left: '2.25rem' }} source={svgSource} />}
              />
            </Flex>
          </Flex>
          <Flex
            onClick={(e: HTMLButtonElement) => isModalClose(e)}
            data-target="closeButton"
            css={{
              width: '2rem',
              height: '2rem',
              position: 'relative',
              top: -3,
              alignItems: 'center',
              '@media (max-width: 734px)': { position: 'absolute', left: 17, top: 12 },
            }}
          >
            <Icon
              source={svgClose}
              css={{ width: 12, cursor: 'pointer', '@media (max-width: 734px)': { display: 'none' } }}
            />
            <Icon
              source={svgArrowLeftMobile}
              css={{
                width: '0.85rem',
                height: ' 1.4rem',
                cursor: 'pointer',
                display: 'none',
                '@media (max-width: 734px)': { display: 'block' },
              }}
            />
          </Flex>
        </Flex>
        <Flex
          css={{
            marginTop: '3.2rem',
            padding: '0 6.1rem',
            '@media (max-width: 734px)': { display: 'block', marginTop: '1rem', padding: '0 ' },
          }}
        >
          <WrapUsersProfiles>
            {users
              ? !filteredUsers?.length
                ? users?.map((item) => {
                    return <MinUserModal key={item.id} profile={item} clickItem={clickItem} />;
                  })
                : filteredUsers?.map((item) => {
                    return <MinUserModal key={item.id} profile={item} clickItem={clickItem} />;
                  })
              : chats?.map((item) => {
                  return <MinUserModal key={item.id} chat={item} clickItem={clickItem} />;
                })}
          </WrapUsersProfiles>
        </Flex>
      </WinModalUsers>
    </WrapModalUsers>
  );
};
