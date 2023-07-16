import styled from '@emotion/styled';
import { formatDistance } from 'date-fns';
import ru from 'date-fns/esm/locale/ru/index';
import dayjs from 'dayjs';
import { FC } from 'react';

import imgEmptyAvatar from '#/img/no-avatar.png';
import { Col, Flex, Typography } from '@/components';
import { ProfileEntity } from '@/features/profile/profile.types';
import { T } from '@tolgee/react';

interface TypeProps {
  profile: ProfileEntity | null;
}

const ImgProfileMobile = styled.div<{ url: string }>(({ url }) => {
  return {
    display: 'none',
    width: '7.1rem',
    minWidth: '7.1rem',
    height: '7.1rem',
    maxHeight: '7.1rem',
    borderRadius: '100%',
    background: `url(${url}) center/cover no-repeat`,

    marginRight: '1.2rem',
    '@media (max-width: 734px)': { display: 'block' },
  };
});

export const TitleProfile: FC<TypeProps> = ({ profile }) => {
  const lastOnline = profile?.user.lastOnline;
  const currentTime = new Date();
  const lastOnlineFormatted = dayjs(lastOnline).format('DD-MM-YYYY HH:mm');
  const currentTimeFormatted = dayjs(currentTime).format('DD-MM-YYYY HH:mm');

  let status;
  if (lastOnlineFormatted === currentTimeFormatted) {
    status = 'online';
  } else {
    status = `${profile?.user.sex === 'male' ? 'был' : 'была'} в сети ${formatDistance(
      new Date(`${lastOnline}`),
      currentTime,
      { addSuffix: true, locale: ru },
    )}`;
  }

  const age = profile?.user.age;
  const ageInYears = `${dayjs().diff(age, 'year', true)}`;
  const ageAsInteger = parseInt(ageInYears, 10);
  let countAge;
  switch (ageAsInteger % 10) {
    case 1:
      countAge = 'год';
      break;
    case 2:
    case 3:
    case 4:
      countAge = 'года';
      break;
    default:
      countAge = 'лет';
  }
  const years = profile?.user.age && `${ageAsInteger} ${countAge}`;

  return (
    <Col css={{ marginBottom: '2.4rem', '@media (max-width: 734px)': { marginBottom: '1.8rem', display: 'flex' } }}>
      <ImgProfileMobile
        url={
          profile?.user.avatar?.thumbnails[0].fullName
            ? `${__BASE_URL_PICTURE__}/${profile.user.avatar.thumbnails[0].fullName}`
            : imgEmptyAvatar
        }
      />
      <Flex flexDirection="column">
        <Flex
          css={{ marginBottom: '1.6rem', '@media (max-width: 734px)': { marginBottom: '0.5rem' } }}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography css={{ fontSize: '3rem', fontWeight: 500, '@media (max-width: 734px)': { fontSize: '2rem' } }}>
            {profile?.user.firstName && profile?.user.lastName && `${profile.user.firstName} ${profile.user.lastName}`}
          </Typography>
          <Typography
            css={(theme: { color: { mainGray: string } }) => ({
              color: theme.color.mainGray,
              fontSize: '1.6rem',
              '@media (max-width: 734px)': { display: 'none' },
            })}
          >
            {status}
          </Typography>
        </Flex>
        <Typography
          variant="body1"
          css={(theme: { color: { mainPurple: string } }) => ({
            color: theme.color.mainPurple,
            marginBottom: '1.6rem',
            '@media (max-width: 734px)': { fontSize: '1.4rem', marginBottom: '0.8rem' },
          })}
        >
          @{profile?.user.login}
        </Typography>
        <Typography
          css={(theme: { color: { mainGray: string } }) => ({
            display: 'none',
            color: theme.color.mainGray,
            fontSize: '1.4rem',
            '@media (max-width: 734px)': { display: 'block' },
          })}
        >
          {status}
        </Typography>
        <Flex css={{ marginBottom: '1.6rem', '@media (max-width: 734px)': { display: 'none' } }}>
          <Typography
            variant="body1"
            css={(theme: { color: { mainGray: string } }) => ({
              color: theme.color.mainGray,
              marginRight: '1.6rem',
            })}
          >
            <T keyName="gender">Пол</T>:{' '}
            {profile?.user.sex === 'female' ? (
              <T keyName="setting.page.female">женский</T>
            ) : (
              <T keyName="setting.page.male">мужской</T>
            )}
          </Typography>
          <Typography
            variant="body1"
            css={(theme: { color: { mainGray: string } }) => ({
              color: theme.color.mainGray,
              marginRight: '1.6rem',
            })}
          >
            <T keyName="profile.age">Возраст</T>: {years}
          </Typography>
        </Flex>
      </Flex>
    </Col>
  );
};
