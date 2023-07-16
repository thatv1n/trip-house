import { Flex, Typography } from '@/components';
import styled from '@emotion/styled';
import { T } from '@tolgee/react';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import svgCelendar from '#/icons/celendar.svg';
import svgGeo from '#/icons/geo-location.svg';
import svgSmile from '#/icons/smile.svg';
import { Icon } from '@/components/icon/icon';
import { EventShort } from '@/features/home/home.page.types';

const WrapMobileEvent = styled.div<{ isInvite?: boolean }>(({ theme, isInvite }) => {
  return {
    display: !isInvite ? 'none' : 'flex',
    height: '13.9rem',
    background: theme.color.white,
    borderRadius: '1rem',
    padding: '1.2rem 1rem',
    cursor: 'pointer',
    marginBottom: '0.8rem',
    '@media (max-width: 734px)': {
      display: 'flex',
    },
  };
});

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
export const MobileEventItem: FC<EventShort> = (props) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (props.invite) {
      props?.invite(props.id);
    } else {
      navigate(`/about-the-event/${props.id}`);
    }
  };

  return (
    <WrapMobileEvent onClick={onClick} ref={props.lastElem} isInvite={props.isInvite}>
      <ImgEvent bg={`${__BASE_URL_PICTURE__}/${props.pictures?.thumbnails[0].fullName}`} />
      <Flex flexDirection="column" css={{ width: '95%' }}>
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
          {props.title}
        </Typography>
        <Flex mt="1rem" flexDirection="column">
          <Flex height="2rem">
            <Flex alignItems="center" mr="0.8rem">
              <Icon source={svgCelendar} css={{ width: 20 }} />
            </Flex>
            <Typography variant="body1" css={{ fontSize: '1.2rem' }}>
              {dayjs(props.startAt).locale('ru').format('D MMMM / HH:mm')}
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
                width: '25rem',
                '@media (max-width: 425px)': {
                  width: '22rem',
                },
                '@media (max-width: 375px)': {
                  width: '19rem',
                },
                '@media (max-width: 320px)': {
                  width: '15rem',
                },
              }}
            >
              {props.address?.detail}
            </Typography>
          </Flex>
          <Flex height="2rem" mt="0.5rem">
            <Flex alignItems="center" mr="0.8rem">
              <Icon source={svgSmile} css={{ width: 20 }} />
            </Flex>
            <Typography variant="body1" css={{ fontSize: '1.2rem' }}>
              {props.numberOfMembers} <T keyName="participants_out">из</T> ${props.maxNumberOfPeople}{' '}
              <T keyName="participants">участников</T>
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </WrapMobileEvent>
  );
};
