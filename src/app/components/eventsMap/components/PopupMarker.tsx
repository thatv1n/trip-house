import styled from '@emotion/styled';
import { T } from '@tolgee/react';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import svgCelendar from '#/icons/celendar.svg';
import svgGeo from '#/icons/geo-location.svg';
import svgSmile from '#/icons/smile.svg';

import { Col, Flex, Row, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';
import { EventPropsShort } from './PopupMarker.types';

const ImgEvent = styled.div<{ bg: string }>(({ bg }) => {
  return {
    width: 97,
    minWidth: 97,
    borderRadius: 10,
    background: `url(${bg}) center/cover no-repeat`,
    maxHeight: 121,
    marginRight: 14,
  };
});

export const PopupMarker: FC<EventPropsShort> = ({ item }) => {
  const navigate = useNavigate();
  const goToEvents = (id: string): void => {
    navigate(`/about-the-event/${id}`);
  };

  return (
    <div onClick={() => goToEvents(`${item.id}`)}>
      <Popup closeButton={false} css={{ cursor: 'pointer' }}>
        <ImgEvent bg={`${__BASE_URL_PICTURE__}/${item.pictures?.thumbnails[0].fullName}`} />
        <Flex flexDirection="column" css={{ width: '20rem' }}>
          <Typography
            variant="body1"
            css={{
              maxHeight: 40,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.title}
          </Typography>
          <Col mt="1rem">
            <Row>
              <Flex height="2rem">
                <Flex alignItems="center" mr="0.8rem">
                  <Icon source={svgCelendar} css={{ width: 20 }} />
                </Flex>
                <Typography variant="body1" css={{ fontSize: '1.2rem' }}>
                  {dayjs(item.startAt).locale('ru').format('D MMMM / HH:mm')}
                </Typography>
              </Flex>
              <Flex height="2rem" mt="0.5rem">
                <Flex alignItems="center" mr="0.8rem">
                  <Icon source={svgGeo} css={{ width: 20 }} />
                </Flex>
                <Typography
                  variant="body1"
                  css={{
                    fontSize: '1.2rem',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: '18rem',
                  }}
                >
                  {item.address?.detail}
                </Typography>
              </Flex>
              <Flex height="2rem" mt="0.5rem">
                <Flex alignItems="center" mr="0.8rem">
                  <Icon source={svgSmile} css={{ width: 20 }} />
                </Flex>
                <Typography variant="body1" css={{ fontSize: '1.2rem' }}>
                  {item.numberOfMembers} <T keyName="participants_out">из</T> {item.maxNumberOfPeople}{' '}
                  <T keyName="participants">участников</T>
                </Typography>
              </Flex>
            </Row>
          </Col>
        </Flex>
      </Popup>
    </div>
  );
};
