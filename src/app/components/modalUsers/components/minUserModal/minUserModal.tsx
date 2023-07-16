/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { FC } from 'react';

import imgEmptyAvatar from '#/img/no-avatar.png';
import { Typography } from '@/components/typography';
import { minUserModalTypes } from './minUserModal.types';

const WrapMinUser = styled.div(({ theme }) => {
  return {
    display: 'flex',
    cursor: 'pointer',
    textAlign: 'center',
    width: 161,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5rem',
    marginRight: '6.6rem',
    '&:hover': {
      textDecoration: 'underline',
    },
    '@media (max-width: 614px)': {
      width: '100%',
      flexDirection: 'row',
      background: theme.color.white,
      marginBottom: 2,
      marginRight: 0,
      padding: '1.6rem 0.8rem',
    },
  };
});

const Avatar = styled.div<{ url: string }>((url) => {
  return {
    width: 141,
    height: 141,
    borderRadius: '50%',
    marginBottom: 16,
    background: `url(${url.url})    center / cover  no-repeat`,
    '@media (max-width: 734px)': {
      width: 114,
      height: 114,
    },
    '@media (max-width: 614px)': {
      width: 37,
      height: 37,
      marginRight: 14,
      marginBottom: 0,
    },
  };
});

export const MinUserModal: FC<minUserModalTypes> = ({ profile, clickItem, chat }) => {
  const doIt = (id: string) => {
    clickItem(id);
  };

  return profile ? (
    <WrapMinUser onClick={() => profile && doIt(profile.id)}>
      <Avatar
        url={
          profile?.avatar?.thumbnails[0]
            ? `${__BASE_URL_PICTURE__}/${profile.avatar.thumbnails[0].fullName}`
            : imgEmptyAvatar
        }
      />
      <Typography variant="body1">
        {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : profile?.login}
      </Typography>
    </WrapMinUser>
  ) : (
    <WrapMinUser onClick={() => chat && doIt(chat.id)}>
      <Avatar
        url={
          chat?.type === 'personal'
            ? chat?.target?.avatar?.thumbnails[0]
              ? `${__BASE_URL_PICTURE__}/${chat.target.avatar.thumbnails[0].fullName}`
              : imgEmptyAvatar
            : `${__BASE_URL_PICTURE__}/${chat?.event?.pictures.thumbnails[0].fullName}`
        }
      />
      <Typography variant="body1">
        {chat?.type === 'personal' ? `${chat?.target?.firstName} ${chat?.target?.lastName}` : `${chat?.event?.title} `}
      </Typography>
    </WrapMinUser>
  );
};
