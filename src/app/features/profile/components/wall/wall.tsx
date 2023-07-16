/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { Box, Flex, Typography } from '@/components';

import svgGeo from '#/icons/geo.svg';
import imgAuthorPost from '#/img/no-avatar.png';

import { Icon } from '@/components/icon/icon';
import { getUserSelector } from '@/features/auth/auth.selectors';
import { T } from '@tolgee/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profileApi } from '../../profile.api';
import { SendPost } from './components';
import { WallProps, WallType } from './wall.types';

interface ItemProps {
  item: WallType;
}

const Root = styled.div(({ theme }) => {
  return {
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    minWidth: '23.5rem',
    padding: '2rem',
    marginBottom: '2rem',
    width: '100%',
    minHeight: '7.2rem',
    display: 'flex',
    '@media (max-width: 734px)': { backgroundColor: theme.colors.bg, padding: '0', marginBottom: '7.1rem' },
  };
});

const AuthorPost = styled.div(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '2.5rem',
    '@media (max-width: 734px)': {
      backgroundColor: theme.colors.white,
      marginBottom: '0.2rem',
      padding: '1.2rem 1.6rem',
    },
  };
});

const ImgAuthorPost = styled.div<{ url: string }>(({ url }) => {
  return {
    width: '2.4rem',
    height: '2.4rem',
    background: `url(${url}) center center / cover no-repeat`,
    borderRadius: '50%',
    marginRight: '1rem',
  };
});

const ImgPicturePost = styled.img(() => {
  return {
    width: 'auto',
    maxWidth: '71.7rem',
    height: '100%',
    maxHeight: '50rem',
    borderRadius: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    '@media (max-width: 1080px)': { maxWidth: '61.7rem' },
    '@media (max-width: 985px)': { maxWidth: '51.7rem' },
    '@media (max-width: 880px)': { maxWidth: '41.7rem' },
    '@media (max-width: 780px)': { maxWidth: '31.7rem' },
  };
});

const TypePost = ({ item }: ItemProps): JSX.Element => {
  return (
    <div>
      {item.picture?.thumbnails[0].fullName && !item.text ? (
        'новое фото пользователя'
      ) : item.picture?.thumbnails[0].fullName ? (
        'пост созданный пользователем'
      ) : item.text && item.text.split(' ')[1] !== 'посещение' ? (
        dayjs(item.createdAt).format('DD.MM.YYYY') === dayjs(new Date()).format('DD.MM.YYYY') ? (
          dayjs(item.createdAt).format('HH:mm')
        ) : (
          dayjs(item.createdAt).format('DD.MM.YYYY HH:mm')
        )
      ) : item.author.sex === 'male' ? (
        <T keyName="profile.page.planned_to_visit_male">запланировал посещение ивента</T>
      ) : (
        <T keyName="profile.page.planned_to_visit_female">запланировала посещение ивента</T>
      )}
    </div>
  );
};

const EventPost = ({ item }: ItemProps): JSX.Element => {
  return (
    <div>
      {item?.text &&
        item.text.split(' ')[1] !== 'посещение' &&
        ((!item.picture?.thumbnails[0].fullName && item.text) ||
          (item.picture?.thumbnails[0].fullName && item.text)) && (
          <Flex flexDirection="column" ml="1.6rem">
            <Flex mb="0.6rem">
              {item.picture?.thumbnails[0].fullName ? (
                <Typography
                  variant="body1"
                  css={(theme: { color: { mainPurple: string } }) => ({
                    color: theme.color.mainPurple,
                    marginRight: '1.4rem',
                  })}
                >
                  {item.author.firstName}
                </Typography>
              ) : (
                !item.text && (
                  <Typography
                    variant="body1"
                    css={(theme: { color: { mainPurple: string } }) => ({
                      color: theme.color.mainPurple,
                      marginRight: '1.4rem',
                    })}
                  >
                    {item.author.firstName}
                  </Typography>
                )
              )}
            </Flex>
            <Typography
              variant="body1"
              css={(theme: { color: { black: string } }) => ({
                color: theme.color.black,
              })}
            >
              {item.text}
            </Typography>
          </Flex>
        )}
    </div>
  );
};

export const Wall: React.FC<WallProps> = ({ id, getMyProfile }) => {
  const navigate = useNavigate();
  const [wall, setWall] = useState<WallType[] | null>(null);
  const user = useSelector(getUserSelector);

  const getWall = async (): Promise<any> => {
    const typeRequest = id === user?.id ? '' : id;
    const response = await profileApi.getWall(`${typeRequest}`).then((res) => {
      return res.json();
    });
    if (response.success) {
      setWall(response.data.reverse());
    } else {
      throw response.error;
    }
  };

  useEffect(() => {
    getWall();
  }, []);

  return (
    <>
      {user?.id === id && <SendPost getWall={getWall} getMyProfile={getMyProfile} />}
      <Root>
        <Flex flexDirection="column" width="100%">
          {wall &&
            (wall.length ? (
              wall?.map((item: WallType) => {
                return (
                  <AuthorPost key={item.id}>
                    <Flex alignItems="center" flexWrap="wrap">
                      <Flex
                        alignItems="center"
                        css={{
                          cursor: 'pointer',
                        }}
                        onClick={() => navigate(`/profile/${item.author.id}`)}
                      >
                        <ImgAuthorPost
                          url={
                            item?.author?.avatar?.thumbnails[0]
                              ? `${__BASE_URL_PICTURE__}/${item.author.avatar.thumbnails[0].fullName}`
                              : imgAuthorPost
                          }
                        />
                        <Typography
                          variant="body2"
                          css={{
                            marginRight: 3,
                            transition: 'color 0.5s easy-in-out',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {item.author.firstName}
                        </Typography>
                      </Flex>

                      <Typography
                        variant="body2"
                        css={(theme: { color: { mainGray: string } }) => ({
                          color: theme.color.mainGray,
                          marginRight: 8,
                        })}
                      >
                        <TypePost item={item} />
                      </Typography>
                      <Typography
                        variant="body2"
                        css={() => ({ marginRight: 11, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } })}
                        onClick={() => navigate(`/about-the-event/${item.meta}`)}
                      >
                        {item.text &&
                          item.text.split(' ')[1] === 'посещение' &&
                          item.text.split(' ').splice(3).join(' ')}
                      </Typography>
                      {item.text && item.text.split(' ')[1] === 'посещение' && (
                        <Icon source={svgGeo} css={{ width: '1.6rem' }} />
                      )}
                    </Flex>
                    <Box>
                      <Flex css={{ '@media (max-width: 780px)': { justifyContent: 'center' } }}>
                        {item.picture?.thumbnails[0].fullName && (
                          <ImgPicturePost src={`${__BASE_URL_PICTURE__}/${item.picture?.thumbnails[0].fullName}`} />
                        )}
                      </Flex>

                      <EventPost item={item} />
                    </Box>
                  </AuthorPost>
                );
              })
            ) : (
              <Typography variant="body1">Новостей нет :(</Typography>
            ))}
        </Flex>
      </Root>
    </>
  );
};
