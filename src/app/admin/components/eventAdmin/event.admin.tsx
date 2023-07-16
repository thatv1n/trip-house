import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC, useState } from 'react';

import { Flex, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgCelendar from '#/icons/celendar.svg';
import svgGeoGray from '#/icons/geo_gray.svg';
import { EventAdminResponse } from '@/admin/adminPanel/admin-panel.types';
import { moderateEventAdminApi } from './event.admin.api';

const Root = styled.div(({ theme }) => {
  return {
    background: theme.color.white,
    borderRadius: 10,
    marginBottom: 20,
    padding: 30,
    display: 'flex',
    marginRight: 20,
    flexDirection: 'column',
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

const Button = styled.button<{ bg: string }>(({ theme, bg }) => {
  return {
    backgroundColor: bg,
    padding: '1rem 2rem',
    borderRadius: 10,
    border: `1px solid ${bg}`,
    cursor: 'pointer',
    width: '100%',
    color: theme.color.white,
    '&:active': {
      opacity: 0.6,
    },
  };
});

export const EventAdmin: FC<EventAdminResponse> = (props) => {
  const [more, setMore] = useState(false);

  const skipEvent = async (id: string): Promise<any> => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm('Вы действительно хотите опубликовать ивент?');
    if (isConfirm) {
      const response = await moderateEventAdminApi.publishEvent(id).then((res) => {
        return res.json();
      });
      if (response.success) {
        props.getEventsModerate(props.isFilterEvent);
      } else {
        throw response.error;
      }
    }
  };

  const rejectedEvent = async (id: string): Promise<any> => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm('Вы действительно хотите удалить ивент?');
    if (isConfirm) {
      const response = await moderateEventAdminApi.rejectEvent(id).then((res) => {
        return res.json();
      });
      if (response.success) {
        props.getEventsModerate(props.isFilterEvent);
      } else {
        throw response.error;
      }
    }
  };

  return (
    <Root css={props.description.length < 200 && { height: 410 }} ref={props.lastElem}>
      <Typography
        variant="body1"
        css={(theme: { color: { mainGray: string } }) => ({ color: theme.color.mainGray, marginBottom: 15 })}
      >
        Текст ивента:
      </Typography>
      <Typography variant="h1">{props.title}</Typography>
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
                marginBottom: props.description.length > 200 ? 5 : 30,
                height: 40,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }
        }
      >
        {props.description}
      </Typography>
      {props.description.length > 200 && (
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
      <Flex justifyContent="space-between">
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
            <Typography variant="body1">{props.address.detail}</Typography>
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
                {props.author.firstName}
              </Typography>
            </Typography>
          </Flex>
        </Flex>
        <Flex flexDirection="column" css={{ marginLeft: 20 }}>
          <Typography
            variant="body1"
            css={(theme: { color: { mainGray: string } }) => ({ color: theme.color.mainGray, marginBottom: 15 })}
          >
            Фото ивента:
          </Typography>
          <ImgEvents
            imgEventsUrl={`${props?.pictures && `${__BASE_URL_PICTURE__}/${props?.pictures.thumbnails[0].fullName}`}`}
          />
        </Flex>
        <Flex alignItems="flex-end" css={{ marginLeft: 20 }}>
          {props.status !== 'published' && props.status !== 'rejected' && (
            <Button css={{ marginRight: 15 }} bg="#27AB44" onClick={() => skipEvent(props.id)}>
              Пропустить
            </Button>
          )}
          {props.status !== 'rejected' && (
            <Button bg="#AB2727" onClick={() => rejectedEvent(props.id)}>
              Удалить
            </Button>
          )}
        </Flex>
      </Flex>
    </Root>
  );
};
