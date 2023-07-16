/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { T } from '@tolgee/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import svgCelendar from '#/icons/celendar.svg';
import svgGeoGray from '#/icons/geo_gray.svg';
import svgSmile from '#/icons/smile.svg';
import { Col, MobileEventItem, Row, Typography } from '@/components';
import { EventShort } from '@/features/home/home.page.types';
import { Box, Flex } from '../box';
import { Icon } from '../icon/icon';

const WrapperEvents = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.colors.white,
    padding: '3rem',
    marginTop: '2rem',
    borderRadius: 10,
    maxWidth: 1070,
    display: 'flex',
    cursor: 'pointer',
    '@media (max-width: 734px)': {
      display: 'none',
    },
  };
});

const ImgEvents = styled.div<{ imgEventsUrl: string }>(({ imgEventsUrl }) => {
  return {
    background: `url('${imgEventsUrl}')  center/cover`,
    width: '35%',
    marginRight: '2rem',
    borderRadius: 18,
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

const Body = styled.div<{ isHeight?: string; isMaxWidth?: string }>(({ isHeight, isMaxWidth }) => {
  return {
    maxWidth: isMaxWidth,
    overflow: 'hidden',
    height: isHeight,
    textOverflow: 'ellipsis',
    display: 'flex',
  };
});

const CountParticipating = styled.div(({ theme }) => {
  return {
    color: theme.color.mainPurple,
    whiteSpace: 'nowrap',
  };
});

export const ShortEvents: FC<EventShort> = memo((props) => {
  const navigate = useNavigate();

  const goToEvents = (id: string): void => {
    navigate(`/about-the-event/${id}`);
  };

  return (
    <div ref={props.lastElem}>
      <WrapperEvents onClick={() => goToEvents(`${props.id}`)}>
        <ImgEvents imgEventsUrl={`${__BASE_URL_PICTURE__}/${props.pictures?.thumbnails[0].fullName}`} />
        <Col width="90%">
          <Row>
            <Typography variant="h1">{props.title}</Typography>
          </Row>
          <Row marginBottom="2rem">
            {props.categories?.map((tag) => (
              <TagsEvents key={tag.id}>
                <Typography variant="mini1_2">{tag.title}</Typography>
              </TagsEvents>
            ))}
          </Row>
          <Row marginBottom="2rem">
            <Body
              isHeight="6rem"
              isMaxWidth="65%"
              css={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              <Typography variant="body1">{props.description}</Typography>
            </Body>
          </Row>
          <Row marginBottom="1.2rem" maxWidth="50rem">
            <Body>
              <Flex alignItems="center" mr="0.8rem">
                <Icon source={svgCelendar} css={{ width: 20 }} />
              </Flex>
              <Typography variant="body1"> {dayjs(props.startAt).locale('ru').format('D MMMM / HH:mm')}</Typography>
            </Body>
          </Row>
          <Row marginBottom="1.2rem" maxWidth="50rem">
            <Body>
              <Flex alignItems="center" mr="0.8rem">
                <Icon source={svgGeoGray} css={{ width: 20 }} />
              </Flex>
              <Typography variant="body1">{props.address?.detail}</Typography>
            </Body>
          </Row>
          <Row>
            <Body>
              <Flex alignItems="center" mr="0.8rem">
                <Icon source={svgSmile} css={{ width: 20 }} />
              </Flex>
              <Typography variant="body1" display="flex" css={{ whiteSpace: 'pre' }}>
                <CountParticipating>
                  <T
                    keyName="event.number_of_members_1"
                    params={{ numberOfMembers: props.numberOfMembers, maxNumberOfMembers: props.maxNumberOfPeople }}
                  />
                </CountParticipating>
                &nbsp;<T keyName="event.number_of_members_2">участников уже присоединились</T>
              </Typography>
            </Body>
          </Row>
        </Col>
      </WrapperEvents>
      <MobileEventItem {...props} />
    </div>
  );
});
