import styled from '@emotion/styled';
import React from 'react';

import { Button, Col, Flex, Link, Row, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgCelendar from '#/icons/celendar.svg';
import svgGeoGray from '#/icons/geo_gray.svg';
import { MessageEntity, MessageInviteEventStatus } from '../../chat.types';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
// import { changeInviteStatusAction } from '../../chat.actions';

interface InviteComponentProps {
  message: MessageEntity;
  isSender: boolean;
}

const Root = styled.div(({ theme }) => {
  return {
    padding: '1.6rem',
    borderRadius: '1.8rem',
    border: `1px solid ${theme.color.lightGray4}`,
    margin: '2rem',
  };
});

export const InviteComponent: React.FC<InviteComponentProps> = ({ message, isSender }) => {
  const dispatch = useDispatch();
  const { id, event, inviteEventStatus } = message;
  if (!event) {
    return null;
  }
  const {
    id: eventId,
    title,
    startAt,
    address: { detail },
  } = event;
  const date = dayjs(startAt).format('DD MMMM / HH:mm');

  const handlerAcceptInvite = () => {
    // dispatch(changeInviteStatusAction.started({ messageId: id, status: MessageInviteEventStatus.ACCEPT }));
  };
  const handlerRejectInvite = () => {
    // dispatch(changeInviteStatusAction.started({ messageId: id, status: MessageInviteEventStatus.REJECT }));
  };

  return (
    <>
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
      {!isSender && inviteEventStatus === MessageInviteEventStatus.REQUESTED && (
        <Flex m="0 2rem">
          <Button fullSize css={{ marginRight: '1.3rem' }} onClick={handlerAcceptInvite}>
            Принять
          </Button>
          <Button fullSize variant="secondary" onClick={handlerRejectInvite}>
            Отказаться
          </Button>
        </Flex>
      )}
    </>
  );
};
