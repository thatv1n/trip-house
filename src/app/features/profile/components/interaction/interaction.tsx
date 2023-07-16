import styled from '@emotion/styled';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Flex, Link } from '@/components';
import { getUserSelector } from '@/features/auth/auth.selectors';
import { ProfileEntity } from '../../profile.types';

import imgEmptyAvatar from '#/img/no-avatar.png';
import { getCreateChatAction } from '@/features/chat';
import { inviteEventAction } from '@/features/invite-event';
import { getDefaultPictureUrl } from '@/utils';
import { T } from '@tolgee/react';
import { ModalEvents } from './compnents';

interface TypeProps {
  profile: ProfileEntity;
  isSendData: boolean;
  unsubscribe: () => void;
  subscribe: () => void;
}

const Root = styled.div(({ theme }) => {
  return {
    maxWidth: '34.3rem',
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    minWidth: '23.5rem',
    padding: '2rem',
    marginBottom: '2rem',
    marginRight: '2rem',
    '@media (max-width: 734px)': {
      display: 'none',
    },
  };
});

const ImgProfile = styled.div<{ url: string }>(({ url }) => {
  return {
    width: '100%',
    height: '35rem',
    maxHeight: '35rem',
    borderRadius: '1rem',
    background: `url(${url}) center/cover no-repeat`,
    marginBottom: '2.5rem',
    '@media (max-width: 734px)': {
      display: 'none',
    },
  };
});

export const Interaction: React.FC<TypeProps> = ({ profile, isSendData, subscribe, unsubscribe }) => {
  const user = useSelector(getUserSelector);

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const isModalClose = (e: any): void => {
    const { target } = e;
    if (
      target.getAttribute('data-target') ||
      target.tagName === 'path' ||
      (target.tagName === 'svg' && !target.className.baseVal)
    ) {
      setModal(false);
    }
  };

  const message = (): void => {
    dispatch(getCreateChatAction.started(profile.user.id));
  };

  const inviteIvent = (idEvent: string): void => {
    dispatch(inviteEventAction.started({ eventId: idEvent, targetUserId: profile.user.id }, { chatNavigate: true }));
    setModal(false);
  };

  return (
    <Flex flexDirection="column">
      <Root>
        <ImgProfile url={getDefaultPictureUrl(profile.user.avatar, imgEmptyAvatar)} />
        {user?.id === profile.user.id ? (
          <Link to="/profile/settings">
            <Button fullSize>
              <T keyName="settings">Настройки</T>
            </Button>
          </Link>
        ) : (
          <Fragment>
            <Button fullSize css={{ marginBottom: '1rem' }} onClick={message}>
              Сообщение
            </Button>
            <Button fullSize variant="secondary" onClick={() => setModal(true)}>
              Пригласить на Ивент
            </Button>
          </Fragment>
        )}
      </Root>
      {user?.id !== profile.user.id && (
        <Root>
          {profile?.isISubscribed ? (
            <Button fullSize variant="secondary" onClick={() => unsubscribe()} disabled={isSendData}>
              Отписаться
            </Button>
          ) : (
            <Button fullSize onClick={() => subscribe()} disabled={isSendData}>
              Подписаться
            </Button>
          )}
        </Root>
      )}
      {modal && <ModalEvents isModalClose={isModalClose} invite={inviteIvent} />}
    </Flex>
  );
};
