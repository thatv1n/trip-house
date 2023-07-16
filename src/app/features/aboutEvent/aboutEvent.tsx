/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { T } from '@tolgee/react';
import { formatDistance } from 'date-fns';
import ru from 'date-fns/esm/locale/ru/index';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Col, Flex, Modal, ModalUsers, Row, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';
import { LoadingPage, ModalReported } from './components';
import { aboutEventApi } from './event.api';
import { EventResponse, UserType } from './event.types';

import ArrowRight from '#/icons/arrow-right.svg';
import svgCelendar from '#/icons/celendar.svg';
import svgDots from '#/icons/dots-horizontal.svg';
import svgGeo from '#/icons/geo_gray.svg';
import svgSmile from '#/icons/smile.svg';
import imgEmptyAvatar from '#/img/no-avatar.png';
import { getUserSelector } from '../auth/auth.selectors';
import { sendPostApi } from '../profile/components/wall/components/sendPost/sendPost.api';

const WrapContent = styled.div<{
  isBorderRadiusTop?: string;
  isBorderRadiusBottom?: string;
}>(({ theme, isBorderRadiusTop, isBorderRadiusBottom }) => {
  return {
    width: '100%',
    maxWidth: 1070,
    background: theme.color.white,
    borderTopLeftRadius: isBorderRadiusTop,
    borderTopRightRadius: isBorderRadiusTop,
    borderBottomLeftRadius: isBorderRadiusBottom,
    borderBottomRightRadius: isBorderRadiusBottom,
    padding: 30,
    marginBottom: 8,
    position: 'relative',
    '@media (max-width: 734px)': {
      padding: '1.2rem 1.6rem ',
      marginBottom: 2,
      borderRadius: 0,
    },
  };
});

const ImgEvent = styled.div<{ bg: string }>(({ bg }) => {
  return {
    width: '100%',
    maxWidth: 1010,
    minWidth: '53vw',
    borderRadius: 18,
    height: '26.6rem',
    background: `url(${bg}) no-repeat center/cover`,
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

const BodyDesc = styled.div(() => {
  return {
    maxWidth: '90%',
    overflow: 'hidden',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    display: 'flex',
    boxSizing: 'border-box',
  };
});

const AvtorEventImg = styled.div<{ url: string }>(({ url }) => {
  return {
    width: 47,
    height: 47,
    minHeight: 47,
    minWidth: 47,
    borderRadius: '50%',
    marginRight: 12,
    background: `url(${url}) center center / cover no-repeat`,
    '@media (max-width: 734px)': {
      width: 27,
      height: 27,
      minHeight: 27,
      minWidth: 27,
    },
  };
});

const CountParticipating = styled.div<{ isParticipate: string }>(({ isParticipate, theme }) => {
  return {
    color: isParticipate ? theme.color.mainPurple : theme.color.black,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'color 0.4 ease-in-out',
    '&:active': {
      color: theme.color.lightGray,
    },
    '&:hover': { textDecoration: 'underline' },
    '@media (max-width: 734px)': {
      fontSize: '1.4rem',
    },
  };
});

const RightSideBar = styled.div(({ theme }) => {
  return {
    width: 343,
    height: '100%',
    background: theme.color.white,
    marginLeft: 20,
    borderRadius: 10,
    padding: 30,
    '@media (max-width: 734px)': {
      width: '100%',
      display: 'flex',
      marginLeft: 0,
      padding: '0 1.6rem',
      background: theme.color.bg,
      justifyContent: 'center',
      height: 72,
      marginTop: '2rem',
    },
    '@media (max-width: 350px)': {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: '3.5rem',
    },
  };
});

const ReportEvent = styled.div(() => {
  return {
    width: 16,
    position: 'absolute',
    right: 34,
    top: 30,
    cursor: 'pointer',
  };
});

const ModalReportEvent = styled.div((): any => {
  return {
    width: 161,
    height: 44,
    padding: '1.2rem 2.5rem',
    background: '#FFF',
    boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.16)',
    borderRadius: 8,
    left: -134,
    top: 36,
    zIndex: 1,
    position: 'absolute',
    '&:after': {
      content: "''",
      position: ' absolute',
      left: 133,
      top: -23,
      transform: 'rotate(180deg)',
      border: `12px solid transparent`,
      borderTop: `20px solid #FFF`,
    },
  };
});

export const AboutEvent: React.FC = () => {
  const [modalMembers, setModalMembers] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eventData, setEventData] = useState<EventResponse>();
  const [members, setMembers] = useState<UserType[]>([]);
  const [isReported, setIsReported] = useState(false);
  const [modalReported, setModalReported] = useState(false);
  const user = useSelector(getUserSelector);
  const [modal, setModal] = useState(false);
  const [bodyModal, setBodyModal] = useState({ title: '', body: '' });
  const location = useLocation().pathname.split('/');
  const navigate = useNavigate();

  const lastOnline = eventData?.author.lastOnline;
  const currentTime = new Date();
  const lastOnlineFormatted = dayjs(lastOnline).format('DD-MM-YYYY HH:mm');
  const currentTimeFormatted = dayjs(currentTime).format('DD-MM-YYYY HH:mm');
  let status = '';

  const getEventData = async (): Promise<any> => {
    try {
      const [eventResponse, membersResponse] = await Promise.all([
        aboutEventApi.getEvent(location[location.length - 1]),
        aboutEventApi.membersEvent(location[location.length - 1]),
      ]);

      const fetchEvent = await eventResponse.json();
      const FetchMembers = await membersResponse.json();

      if (fetchEvent.success && FetchMembers.success) {
        setEventData(fetchEvent.data);
        setMembers(FetchMembers.data);
        setIsLoading(false);
      } else {
        throw new Error(`Error fetching event data: ${fetchEvent.error || FetchMembers.error}`);
      }
    } catch (error) {
      setIsLoading(true);
      throw error;
    }
  };

  const isModalOpen = (): void => {
    setModalMembers(true);
  };

  const isModalClose = (e: any): void => {
    const { target } = e;
    if (target?.getAttribute('data-target') || target?.tagName === 'svg' || target?.tagName === 'path') {
      setModalMembers(false);
      setModalReported(false);
      setModal(false);
    }
  };

  const connectEvent = async () => {
    const fd = new FormData();
    const response = await aboutEventApi.connectEvent(location[location.length - 1]).then((res) => {
      return res.json();
    });
    if (response.success) {
      if (user?.sex === 'male') {
        fd.append('text', `запланировал посещение ивента ${eventData?.title}`);
        fd.append('meta', `${response.data?.id}`);
      } else {
        fd.append('text', `запланировала посещение ивента ${eventData?.title}`);
        fd.append('meta', `${response.data?.id}`);
      }
      getEventData();
      sendPostApi.createPost(fd);
    } else {
      throw response.error;
    }
  };

  const disconnectEvent = (): void => {
    aboutEventApi.disconnectEvent(location[location.length - 1]).then(() => {
      getEventData();
    });
  };

  const reportEvent = (): void => {
    setIsReported((item) => !item);
    setModalReported((item) => !item);
  };

  const FormatPhone = (): string | null => {
    const phone = eventData?.author.phoneNumber;
    const lenPhone = phone?.length;
    const tt = phone?.split('');
    if (lenPhone === 12 || lenPhone === 13) {
      tt?.splice(2, 0, ' (');
      tt?.splice(6, 0, ') ');
      tt?.splice(10, 0, '-');
      tt?.splice(13 + (lenPhone - 12), 0, '-');
    }
    return tt ? tt.join('') : null;
  };

  if (lastOnlineFormatted === currentTimeFormatted) {
    status = `online`;
  } else {
    status = `${eventData?.author.sex === 'male' ? 'был' : 'была'} в сети ${formatDistance(
      new Date(`${lastOnline}`),
      new Date(),
      { addSuffix: true, locale: ru },
    )}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getEventData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Box>
      <Flex
        justifyContent="center"
        mb="3rem"
        css={{
          margin: '0 1.5rem',
          '@media (max-width: 734px)': {
            flexDirection: 'column',
            margin: '0 ',
            marginBottom: '7.1rem',
          },
        }}
      >
        <Flex flexDirection="column">
          <WrapContent
            isBorderRadiusTop="1rem"
            css={(theme) => ({
              '@media (max-width: 734px)': {
                background: theme.color.bg,
                padding: '1rem 1rem 1.2rem 1rem',
                marginBottom: 0,
              },
            })}
          >
            <ImgEvent
              bg={`${eventData?.pictures && `${__BASE_URL_PICTURE__}/${eventData?.pictures.thumbnails[0].fullName}`}`}
            />
          </WrapContent>
          <WrapContent>
            <Col width="90%">
              <Row>
                <Typography variant="h1">{eventData?.title}</Typography>
              </Row>
              <Row>
                {eventData?.categories?.map((tag, i) => (
                  <TagsEvents key={i}>
                    <Typography variant="mini1_2">{tag.title}</Typography>
                  </TagsEvents>
                ))}
              </Row>
            </Col>
            <ReportEvent>
              <div onClick={() => setIsReported((item) => !item)}>
                <Icon source={svgDots} css={{ width: '2.4rem' }} />
              </div>
              {isReported && (
                <ModalReportEvent onClick={reportEvent}>
                  <Typography variant="body1"><T keyName="event.complain">Пожаловаться</T></Typography>
                </ModalReportEvent>
              )}
            </ReportEvent>
          </WrapContent>
          <WrapContent>
            <BodyDesc>
              <Typography
                variant="body1"
                css={{
                  '@media (max-width: 734px)': {
                    fontSize: '1.4rem',
                  },
                }}
              >
                {eventData?.description}
              </Typography>
            </BodyDesc>
          </WrapContent>
          <WrapContent css={{ marginBottom: '3rem' }} isBorderRadiusBottom="1rem">
            <BodyDesc>
              <Flex alignItems="center" mr="0.8rem" mb="0.8rem">
                <Icon source={svgCelendar} css={{ width: '2.4rem' }} />
              </Flex>
              <Typography
                variant="body1"
                css={{
                  '@media (max-width: 734px)': {
                    fontSize: '1.4rem',
                  },
                }}
              >
                {dayjs(eventData?.startAt).locale('ru').format('D MMMM / HH:mm')}
              </Typography>
            </BodyDesc>
            <BodyDesc
              onClick={() => navigate(`/events/find-event/${eventData?.id}`)}
              css={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              <Flex alignItems="center" mr="0.8rem" mb="0.8rem">
                <Icon source={svgGeo} css={{ width: '2.4rem' }} />
              </Flex>
              <Typography
                variant="body1"
                css={{
                  '@media (max-width: 734px)': {
                    fontSize: '1.4rem',
                  },
                }}
              >
                {eventData?.address.detail}
              </Typography>
            </BodyDesc>
            <BodyDesc>
              <Flex alignItems="center" mr="0.8rem" mb="0.8rem">
                <Icon source={svgSmile} css={{ width: '2.4rem' }} />
              </Flex>
              <Typography
                variant="body1"
                display="flex"
                css={{
                  '@media (max-width: 734px)': {
                    fontSize: '1.4rem',
                    flexWrap: 'wrap',
                  },
                }}
              >
                <CountParticipating isParticipate={`${eventData?.numberOfMembers}`} onClick={isModalOpen}>
                  <T keyName="event.number_of_members_1" params={{ numberOfMembers: eventData?.numberOfMembers, maxNumberOfMembers: eventData?.maxNumberOfPeople }} />
                </CountParticipating>
                &nbsp;<T keyName="event.number_of_members_2">участников уже присоединились</T>
              </Typography>
            </BodyDesc>
          </WrapContent>
          <WrapContent
            isBorderRadiusBottom="1rem"
            isBorderRadiusTop="1rem"
            css={{
              cursor: 'pointer',
              '@media (max-width: 734px)': {
                marginTop: '0.8rem',
              },
            }}
            onClick={() => navigate(`/profile/${eventData?.author.id}`)}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Flex flexDirection="column">
                <Flex
                  css={{
                    marginBottom: '1.6rem',
                    '@media (max-width: 734px)': {
                      marginBottom: '0.7rem',
                    },
                  }}
                >
                  <Flex>
                    <AvtorEventImg
                      url={
                        eventData?.author?.avatar?.thumbnails[0]
                          ? `${__BASE_URL_PICTURE__}/${eventData.author.avatar.thumbnails[0].fullName}`
                          : imgEmptyAvatar
                      }
                    />
                  </Flex>
                  <Flex width="90%" flexDirection="column">
                    <Typography
                      variant="h1"
                      css={{
                        '@media (max-width: 734px)': {
                          fontSize: '1.4rem',
                          fontWeight: 400,
                          lineHeight: '1.6rem',
                        },
                      }}
                    >
                      {eventData?.author.firstName}
                    </Typography>
                    <Typography
                      variant="body1"
                      css={{
                        '@media (max-width: 734px)': {
                          fontSize: '1rem',
                          fontWeight: 400,
                          lineHeight: '1.6rem',
                        },
                      }}
                    >
                      {status}
                    </Typography>
                  </Flex>
                </Flex>
                <Typography
                  variant="body1"
                  css={(theme: any) => ({
                    color: theme.color.darkWhite,
                    '@media (max-width: 734px)': {
                      fontSize: '1.2rem',
                    },
                  })}
                >
                  {FormatPhone()}
                </Typography>
              </Flex>
              <Icon source={ArrowRight} css={{ width: 10 }} />
            </Flex>
          </WrapContent>
        </Flex>
        <RightSideBar>
          {eventData?.isMember ? (
            <>
              <Button
                css={(theme: any) => ({
                  marginBottom: '2rem',
                  background: theme.color.lightWhite,
                  width: '100%',
                  '@media (max-width: 734px)': { width: '16.4rem', height: '3.7rem' },
                })}
                onClick={disconnectEvent}
              >
                <Typography
                  variant="body1"
                  css={(theme: any) => ({
                    color: theme.color.lightGray,
                  })}
                >
                  Выйти из ивента
                </Typography>
              </Button>
              {eventData?.chatId ? (
                <Button
                  variant="secondary"
                  css={(theme) => ({
                    width: '100%',
                    '@media (max-width: 734px)': {
                      width: '16.4rem',
                      height: '3.7rem',
                      marginLeft: '1.3rem',
                      background: theme.color.bg,
                    },
                  })}
                  onClick={() => navigate(`/chat/${eventData?.chatId}`)}
                >
                  <T keyName="event.chat">Чат события</T>
                </Button>
              ) : null}
            </>
          ) : (
            <Button
              css={{
                marginBottom: '2rem',
                width: '100%',
                '@media (max-width: 734px)': { width: '16.4rem', height: '3.7rem' },
              }}
              onClick={connectEvent}
            >
              <Typography
                variant="body1"
                css={(theme: any) => ({
                  color: theme.color.white,
                })}
              >
                <T keyName="event.join">Присоединиться</T>
              </Typography>
            </Button>
          )}
        </RightSideBar>
      </Flex>

      {modalMembers && <ModalUsers users={members} isModalClose={isModalClose} title="Участники" />}
      {modalReported && (
        <ModalReported
          isModalReportedClose={isModalClose}
          setModalReported={setModalReported}
          setModal={setModal}
          setBodyModal={setBodyModal}
        />
      )}
      {modal && <Modal isModalClose={isModalClose} title={bodyModal.title} body={bodyModal.body} />}
    </Box>
  );
};
