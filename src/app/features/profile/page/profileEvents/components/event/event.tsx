/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, MobileEventItem, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgCelendar from '#/icons/celendar.svg';
import svgGeoGray from '#/icons/geo_gray.svg';

import { EventResponse } from '@/features/aboutEvent/event.types';

const Root = styled.div(({ theme }) => {
  return {
    background: theme.color.white,
    borderRadius: 10,
    marginBottom: 20,
    padding: 30,
    display: 'flex',
    marginRight: 20,
    flexDirection: 'column',
    cursor: 'pointer',
    '&:nth-of-type(2n)': {
      marginRight: 0,
    },
    '@media (max-width: 830px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
      marginRight: 0,
      '&:nth-of-type(2n)': {
        marginRight: 0,
      },
    },
  };
});

const TagsEvents = styled.div(({ theme }) => {
  return {
    height: 24,
    background: theme.color.lightGray2,
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    gap: '1rem',
    marginTop: '2rem',
    marginRight: '1rem',
  };
});

const ImgEvents = styled.div<{ imgEventsUrl: string }>(({ imgEventsUrl }) => {
  return {
    background: `url('${imgEventsUrl}')  center/cover`,
    width: 148,
    height: 120,
    borderRadius: 18,
  };
});

export const EventProfile: FC<EventResponse> = (props) => {
  const [more, setMore] = useState(false);
  const navigate = useNavigate();
  return (
    <div ref={props.lastElem}>
      <Root
        onClick={() => navigate(`/about-the-event/${props.id}`)}
        css={
          props?.description.length < 200
            ? {
                height: 410,
                '@media (max-width: 734px)': {
                  display: 'none',
                },
              }
            : {
                '@media (max-width: 734px)': {
                  display: 'none',
                },
              }
        }
      >
        <Typography variant="h1">{props?.title}</Typography>
        <Flex marginBottom="2rem" css={{ flexWrap: 'wrap' }}>
          {props?.categories?.map((tag, i) => (
            <TagsEvents key={i}>
              <Typography variant="mini1_2">{tag.title}</Typography>
            </TagsEvents>
          ))}
        </Flex>
        <Typography
          variant="body1"
          css={
            more
              ? { marginBottom: 10 }
              : {
                  marginBottom: props?.description && props.description.length > 200 ? 5 : 30,
                  height: '100%',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }
          }
        >
          {props?.description}
        </Typography>
        {props?.description && props.description.length > 200 && (
          <Typography
            variant="mini1"
            onClick={() => setMore((item) => !item)}
            css={(theme: { color: { mainPurple: string } }) => ({
              marginBottom: 10,
              textAlign: 'end',
              cursor: 'pointer',
              fontSize: 16,
              color: theme.color.mainPurple,
            })}
          >
            {more ? `Скрыть ` : 'Показать полностью'}
          </Typography>
        )}
        <Flex>
          <Flex flexDirection="column">
            <Typography
              variant="body1"
              css={(theme: { color: { mainGray: string } }) => ({ color: theme.color.mainGray, marginBottom: 15 })}
            >
              Детали ивента:
            </Typography>
            <Flex css={{ marginBottom: 8 }}>
              <Flex alignItems="center" mr="0.8rem">
                <Icon source={svgCelendar} css={{ width: 20 }} />
              </Flex>
              <Typography variant="body1">{dayjs(props?.startAt).locale('ru').format('D MMMM / HH:mm')}</Typography>
            </Flex>
            <Flex css={{ marginBottom: 8 }}>
              <Flex alignItems="center" mr="0.8rem">
                <Icon source={svgGeoGray} css={{ width: 20 }} />
              </Flex>
              <Typography variant="body1"> {props?.address.detail}</Typography>
            </Flex>
            <Flex>
              <Typography variant="body1">
                Создатель:
                <Typography
                  css={(theme: { color: { mainPurple: string } }) => ({
                    color: theme.color.mainPurple,
                    cursor: 'pointer',
                    marginLeft: 5,
                  })}
                >
                  {props?.author.firstName}
                </Typography>
              </Typography>
            </Flex>
          </Flex>
          <Flex flexDirection="column" css={{ marginLeft: 70 }}>
            <Typography
              variant="body1"
              css={(theme: { color: { mainGray: string } }) => ({ color: theme.color.mainGray, marginBottom: 15 })}
            >
              Фото ивента:
            </Typography>
            <ImgEvents imgEventsUrl={`${__BASE_URL_PICTURE__}/${props?.pictures.thumbnails[0].fullName}`} />
          </Flex>
        </Flex>
      </Root>
      <MobileEventItem {...props} />
    </div>
  );
};
