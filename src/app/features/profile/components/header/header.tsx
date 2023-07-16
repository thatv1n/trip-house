import styled from '@emotion/styled';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Flex, ModalProfileGallery } from '@/components';

import { getUserSelector } from '@/features/auth/auth.selectors';
import { ProfileEntity } from '../../profile.types';

import { getCreateChatAction } from '@/features/chat';
import { ModalEvents } from '../interaction/compnents';
import { InfoProfile, TitleProfile } from './components';
import { inviteEventAction } from '@/features/invite-event';
import { useTranslate } from '@tolgee/react';

interface TypeProps {
  profile: ProfileEntity;
  isSendData: boolean;
  unsubscribe: () => void;
  subscribe: () => void;
}

const Root = styled.div(({ theme }) => {
  return {
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    minWidth: '23.5rem',
    padding: '3rem',
    marginBottom: '2rem',
    width: '100%',
    minHeight: '23.2rem',
    '@media (max-width: 734px)': {
      padding: '1.2rem 1.6rem',
      minHeight: 'auto',
      borderRadius: '0',
      marginBottom: '1rem',
    },
  };
});

export const Header: FC<TypeProps> = ({ profile, isSendData, subscribe, unsubscribe }) => {
  const { t } = useTranslate();
  const user = useSelector(getUserSelector);

  const [modalGallery, setModalGallery] = useState<boolean>(false);
  const [isGallery, setIsGallery] = useState(false);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const isModalClose = (e: any): void => {
    const { target } = e;
    if (
      target.getAttribute('data-target') ||
      target.tagName === 'path' ||
      (target.tagName === 'svg' && !target.className.baseVal)
    ) {
      if (isGallery) {
        setIsGallery(false);
      } else {
        setModalGallery(false);
      }
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
        <TitleProfile profile={profile} />
        <InfoProfile profile={profile} setModalGallery={setModalGallery} />
      </Root>
      <Flex flexDirection="column" css={{ display: 'none', '@media (max-width: 734px)': { display: 'flex' } }}>
        {user?.id !== profile.user.id && (
          <Root>
            <Button fullSize css={{ marginBottom: '1rem' }} onClick={message}>
              Сообщение
            </Button>

            <Button fullSize variant="secondary" onClick={() => setModal(true)}>
              Пригласить на Ивент
            </Button>
          </Root>
        )}
        {user?.id !== profile.user.id && (
          <Root>
            {profile?.isISubscribed ? (
              <Button fullSize onClick={unsubscribe} variant="secondary" disabled={isSendData}>
                Отписаться
              </Button>
            ) : (
              <Button fullSize onClick={subscribe} variant="secondary" disabled={isSendData}>
                Подписаться
              </Button>
            )}
          </Root>
        )}
      </Flex>
      {modalGallery && (
        <ModalProfileGallery
          id={profile.user.id}
          isModalClose={isModalClose}
          title={t('profile.page.photos', 'Фотографии')}
          setIsGallery={setIsGallery}
          isGallery={isGallery}
        />
      )}
      {modal && <ModalEvents isModalClose={isModalClose} invite={inviteIvent} />}
    </Flex>
  );
};
