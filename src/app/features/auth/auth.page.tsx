import { css } from '@emotion/react';
import { FC, useEffect, useMemo, useRef } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import authSlide1 from '#/img/auth-slide1.png';
import authSlide2 from '#/img/auth-slide2.png';
import authSlide3 from '#/img/auth-slide3.png';
import { Button, Col, Container, Row, Section, Typography } from '@/components';
import { getUserOldSessions } from '@/utils';
import styled from '@emotion/styled';
import { T } from '@tolgee/react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthConfirmSmsPage } from './auth-confirm-sms.page';
import { AuthIndexPage } from './auth-index.page';
import { AuthRegisterPage } from './auth-register.page';
import { sendSmsAuthAction } from './auth.actions';
import { isLogedinSelector } from './auth.selectors';
import { ProfileCard, Slide } from './components';

const swiperModules = [Autoplay, Pagination];
const swiperAutoplay = { delay: 10000 };
const swiperPagination = { clickable: true };

const AuthSlide1Img = styled.div({
  background: 'no-repeat center',
  backgroundImage: `url(${authSlide1})`,
  width: 307,
  height: 288,
  marginBottom: '2rem',
});

const AuthSlide2Img = styled.div({
  background: 'no-repeat center',
  backgroundImage: `url(${authSlide2})`,
  width: 285,
  height: 303,
  marginBottom: '1.3rem',
});

const AuthSlide3Img = styled.div({
  background: 'no-repeat center',
  backgroundImage: `url(${authSlide3})`,
  width: 273,
  height: 273,
  marginBottom: '2.8rem',
});

const swiperPaginationBulletCss = css({
  border: '50%',
  width: '.8rem',
  height: '.8rem',
});

const swiperPaginationBulletActiveCss = css({
  backgroundColor: '#6C27AB',
});

const swiperParentCss = css({
  '& .swiper-pagination-bullet': swiperPaginationBulletCss,
  '& .swiper-pagination-bullet-active': swiperPaginationBulletActiveCss,
  '& .swiper-pagination': {
    bottom: 0,
  },
  '@media (max-width: 734px)': {
    padding: '0',
    height: '100dvh',
    '& .swiper-pagination': {
      bottom: -7,
      height: '2rem',
    },
  },
});

export const AuthPage: FC<unknown> = () => {
  const navigate = useNavigate();
  const isLogedin = useSelector(isLogedinSelector);
  const dispatch = useDispatch();
  const body = document.querySelector('body');
  const screenWidth = window.screen.width;
  const users = useMemo(() => getUserOldSessions(), []);
  const form = useRef<HTMLDivElement | null>(null);
  const handleSessionClick = (phoneNumber: string): void => {
    dispatch(sendSmsAuthAction.started(phoneNumber.replace(/[ ]/g, '')));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLogedin) {
      navigate('/');
      if (body) body.style.overflow = 'auto';
    }
  }, [isLogedin]);

  useEffect(() => {
    if (screenWidth <= 734) {
      // if (body) body.style.overflow = 'hidden';
    }
  }, [body]);

  const goToForm = () => {
    form.current?.scrollIntoView();
  };

  return (
    <Container>
      <Row
        css={{
          '@media (max-width: 734px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Col
          css={{
            width: '60%',
            '@media (max-width: 734px)': {
              display: 'flex',
              width: 'auto',
              padding: 0,
            },
          }}
        >
          <Section
            css={{
              '@media (max-width: 734px)': {
                display: 'none',
              },
            }}
          >
            <Row mb="1.2rem">
              <Col>
                <Typography variant="h1">Недавно заходили на сайт с этого устройства</Typography>
              </Col>
            </Row>
            <Row mb="2rem">
              <Col>
                <Typography variant="body1" color="mainGray">
                  Чтобы войти снова, нажмите на фотографию или имя
                </Typography>
              </Col>
            </Row>
            <Row>
              {users.length > 0 ? (
                users.map((user) => <ProfileCard key={user.id} userSession={user} onSelect={handleSessionClick} />)
              ) : (
                <ProfileCard onSelect={handleSessionClick} />
              )}
            </Row>
          </Section>
          <Section css={swiperParentCss}>
            <Swiper
              modules={swiperModules}
              slidesPerView={1}
              autoplay={swiperAutoplay}
              pagination={swiperPagination}
              css={{
                '@media (max-width: 734px)': {
                  top: '5%',
                  height: '45rem',
                },
              }}
            >
              <SwiperSlide>
                <Slide
                  img={<AuthSlide1Img />}
                  title={<T keyName="auth.page.slide_1_1">Создавайте ивенты</T>}
                  description={
                    <T keyName="auth.page.slide_1_2">
                      Опишите мероприятие, место и время проведения. Новые люди уже спешат скорее познакомиться!
                    </T>
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <Slide
                  img={<AuthSlide2Img />}
                  title={<T keyName="auth.page.slide_2_1">Заводите знакомства</T>}
                  description={
                    <T keyName="auth.page.slide_2_2">
                      Выбирайте пользователя, приглашайте его на ивент или создайте свой только для вас.
                    </T>
                  }
                />
              </SwiperSlide>
              <SwiperSlide>
                <Slide
                  img={<AuthSlide3Img />}
                  title={<T keyName="auth.page.slide_3_1">Развивайте свои хобби</T>}
                  description={
                    <T keyName="auth.page.slide_3_2">
                      Множество направлений деятельности: от игры в футбол до обсуждения книг.
                    </T>
                  }
                />
              </SwiperSlide>
            </Swiper>
          </Section>
        </Col>
        <Button
          onClick={goToForm}
          css={{
            position: 'relative',
            top: '-13rem',
            display: 'none',
            width: '90%',
            '@media (max-width: 734px)': {
              display: 'flex',
              margin: '0 auto',
              justifyContent: 'center',
            },
          }}
        >
          <T keyName="auth.button.next">Далее</T>
        </Button>
        <Col
          css={{
            '@media (max-width: 734px)': {
              width: '100%',
              height: '80vh',
              padding: 0,
              marginTop: '-5.2rem',
            },
          }}
        >
          <Section>
            <Routes>
              <Route index element={<AuthIndexPage />} />
              <Route path="/confirm-sms/:authId" element={<AuthConfirmSmsPage />} />
              <Route path="/register/:authId" element={<AuthRegisterPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
          </Section>
        </Col>
      </Row>
      <div ref={form} />
    </Container>
  );
};
