import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';

import { Flex, Link, ModalUsers, Typography } from '@/components';
import { UserType } from '@/features/aboutEvent/event.types';
import { getUserSelector } from '@/features/auth/auth.selectors';
import { ProfileEntity } from '@/features/profile/profile.types';
import { T } from '@tolgee/react';
import { useSelector } from 'react-redux';
import { infoProfileApi } from './infoProfile.api';

interface TypeProps {
  profile: ProfileEntity;
  setModalGallery: (data: boolean) => void;
}

const ItemInfoProfile = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    '&:last-child': {
      marginRight: '0',
    },
  };
});

export const InfoProfile: FC<TypeProps> = ({ profile, setModalGallery }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalSubscribers, setSubscribers] = useState<boolean>(false);
  const [modalSubscriptions, setSubscriptions] = useState<boolean>(false);
  const user = useSelector(getUserSelector);
  const [users, setUsers] = useState<UserType[]>([]);

  const isModalClose = (e: any, typeModal?: string): void => {
    const { target } = e;
    if (target?.getAttribute('data-target') || target?.tagName === 'svg' || target?.tagName === 'path' || typeModal) {
      setModal(false);
      setSubscriptions(false);
      setSubscribers(false);
    }
  };

  const GetInfoSub = async (): Promise<any> => {
    if (profile.user.id === user?.id) {
      if (modalSubscribers) {
        const response = await infoProfileApi.getMySubscribers().then((res) => {
          return res.json();
        });
        if (response.success) {
          setUsers(response.data);
          setModal(true);
        } else {
          throw response.error;
        }
      }
      if (modalSubscriptions) {
        const response = await infoProfileApi.getMySubscription().then((res) => {
          return res.json();
        });
        if (response.success) {
          setUsers(response.data);
          setModal(true);
        } else {
          throw response.error;
        }
      }
    } else {
      if (modalSubscribers) {
        const response = await infoProfileApi.getIdSubscribers(profile.user.id).then((res) => {
          return res.json();
        });
        if (response.success) {
          setUsers(response.data);
          setModal(true);
        } else {
          throw response.error;
        }
      }

      if (modalSubscriptions) {
        const response = await infoProfileApi.getIdSubscription(profile.user.id).then((res) => {
          return res.json();
        });
        if (response.success) {
          setUsers(response.data);
          setModal(true);
        } else {
          throw response.error;
        }
      }
    }
  };

  useEffect(() => {
    GetInfoSub();
  }, [modalSubscribers, modalSubscriptions]);

  return (
    <Flex
      css={{
        width: '100%',
        maxWidth: '48.8rem',
        fontSize: '3rem',
        '@media (max-width: 734px)': { fontSize: '1.6rem' },
      }}
      justifyContent="space-between"
    >
      <ItemInfoProfile onClick={() => setSubscriptions(true)}>
        <Typography
          css={{ fontWeight: 500, marginBottom: '1.6rem', '@media (max-width: 734px)': { marginBottom: '0.5rem' } }}
        >
          {profile?.subscriptions}
        </Typography>
        <Typography css={{ fontSize: '1.6rem', '@media (max-width: 734px)': { fontSize: '1.4rem' } }}>
          <T keyName="profile.page.subscribtions">Подписки</T>
        </Typography>
      </ItemInfoProfile>
      <ItemInfoProfile onClick={() => setSubscribers(true)}>
        <Typography
          css={{ fontWeight: 500, marginBottom: '1.6rem', '@media (max-width: 734px)': { marginBottom: '0.5rem' } }}
        >
          {profile.subscribers}
        </Typography>
        <Typography css={{ fontSize: '1.6rem', '@media (max-width: 734px)': { fontSize: '1.4rem' } }}>
          <T keyName="profile.page.subscribers">Подписчики</T>
        </Typography>
      </ItemInfoProfile>
      <Link to={`/profile/events/${profile.user.id}`}>
        <ItemInfoProfile>
          <Typography
            css={{ fontWeight: 500, marginBottom: '1.6rem', '@media (max-width: 734px)': { marginBottom: '0.5rem' } }}
          >
            {profile.events}
          </Typography>
          <Typography css={{ fontSize: '1.6rem', '@media (max-width: 734px)': { fontSize: '1.4rem' } }}>
            <T keyName="common.events">Ивенты</T>
          </Typography>
        </ItemInfoProfile>
      </Link>
      <ItemInfoProfile onClick={() => setModalGallery(true)}>
        <Typography
          css={{ fontWeight: 500, marginBottom: '1.6rem', '@media (max-width: 734px)': { marginBottom: '0.5rem' } }}
        >
          {profile.photos}
        </Typography>
        <Typography css={{ fontSize: '1.6rem', '@media (max-width: 734px)': { fontSize: '1.4rem' } }}>
          <T keyName="profile.page.photos">Фотографий</T>
        </Typography>
      </ItemInfoProfile>
      {modal && (
        <ModalUsers
          users={users}
          isModalClose={isModalClose}
          title={
            modalSubscribers ? (
              <T keyName="profile.page.subscribers">Подписчики</T>
            ) : (
              modalSubscriptions && <T keyName="profile.page.subscribtions">Подписки</T>
            )
          }
        />
      )}
    </Flex>
  );
};
