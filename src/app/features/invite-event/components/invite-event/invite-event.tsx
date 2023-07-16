import { Button, Col, Flex, Link, Row, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';
import { EventResponse } from '@/features/aboutEvent/event.types';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC, Fragment } from 'react';

import svgCelendar from '#/icons/celendar.svg';
import svgGeoGray from '#/icons/geo_gray.svg';

const Root = styled.div(({ theme }) => {
  return {
    padding: '1.6rem',
    borderRadius: '1.8rem',
    border: `1px solid ${theme.color.lightGray4}`,
    margin: '2rem',
  };
});

interface InviteEventProps {
  onAccept: () => void;
  onReject: () => void;
  event: EventResponse;
  isSender: boolean;
}

export const InviteEvent: FC<InviteEventProps> = ({ event, isSender, onAccept, onReject }) => {
  const {
    id: eventId,
    title,
    startAt,
    address: { detail },
  } = event;
  const date = dayjs(startAt).format('DD MMMM / HH:mm');

  return (
    <Fragment>
      <Link to={`/about-the-event/${eventId}`}>
        <Root>
          <Col mb="1.6rem">
            <Row>
              <Typography variant="body1">{title}</Typography>
            </Row>
          </Col>
          <Flex mb="0.5rem">
            <Flex alignItems="center" mr="0.8rem">
              <Icon source={svgCelendar} css={{ width: 20 }} />
            </Flex>
            <Typography variant="body1">{date}</Typography>
          </Flex>
          {detail ? (
            <Flex mb="0.5rem">
              <Flex alignItems="center" mr="0.8rem">
                <Icon source={svgGeoGray} css={{ width: 20 }} />
              </Flex>
              <Typography variant="body1">{detail}</Typography>
            </Flex>
          ) : null}
        </Root>
      </Link>
      {!isSender && (
        <Flex m="0 2rem">
          <Button fullSize css={{ marginRight: '1.3rem' }} onClick={onAccept}>
            Принять
          </Button>
          <Button fullSize variant="secondary" onClick={onReject}>
            Отказаться
          </Button>
        </Flex>
      )}
    </Fragment>
  );
};
