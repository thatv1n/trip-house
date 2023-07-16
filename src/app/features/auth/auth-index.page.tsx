/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, FormEvent, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';

import { Button, Col, Flex, Link, Row, Typography } from '@/components';
import styled from '@emotion/styled';
import { T } from '@tolgee/react';
import { sendSmsAuthAction } from './auth.actions';

const PhoneInputParent = styled(Col)(({ theme }) => ({
  '& .form-control': {
    width: '100%',
    height: '4rem',
    padding: '1rem 2rem',
    paddingLeft: '5rem',
    borderRadius: 10,
    backgroundColor: theme.colors.lightWhite0,
    border: 0,
    ...theme.typography.body1,
  },
  '& .flag-dropdown': {
    border: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent!important',
  },
  '& .selected-flag': {
    backgroundColor: 'transparent!important',
    paddingLeft: '2rem',
  },
}));

export const AuthIndexPage: FC<unknown> = () => {
  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const dispatch = useDispatch();
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('phoneNumber: %o', phoneNumberValue);
    dispatch(sendSmsAuthAction.started(`+${phoneNumberValue.replace(/[ ]/g, '')}`));
  };
  return (
    <Flex
      css={{
        '@media (max-width: 734px)': {
          height: '90vh',
        },
      }}
    >
      <form onSubmit={handleFormSubmit}>
        <Flex
          flexDirection="column"
          css={{
            '@media (max-width: 734px)': {
              justifyContent: 'space-between',
            },
          }}
        >
          <Flex
            flexDirection="column"
            css={{
              '@media (max-width: 734px)': {
                marginBottom: '8dvh',
              },
            }}
          >
            <Row mb="3rem">
              <Col display="flex" justifyContent="center">
                <Typography variant="h1">
                  <T keyName="auth.page.enter_account">Вход в аккаунт</T>
                </Typography>
              </Col>
            </Row>
            <Row mb="1rem">
              <PhoneInputParent>
                <PhoneInput
                  country="lv"
                  placeholder=""
                  inputProps={{ name: 'phoneNumber' }}
                  onEnterKeyPress={handleFormSubmit}
                  value={phoneNumberValue}
                  onChange={setPhoneNumberValue}
                />
              </PhoneInputParent>
            </Row>
            <Row
              css={{
                marginBottom: '6.5rem',
                '@media (max-width: 734px)': {
                  marginBottom: '55dvh',
                },
              }}
            >
              <Col>
                <Typography variant="mini1">
                  <T keyName="auth.page.send_sms_with_code">Отправим вам СМС с кодом подтверждения.</T>
                </Typography>
              </Col>
            </Row>
          </Flex>
          <Flex flexDirection="column">
            <Row mb="1.6rem">
              <Col>
                <Button type="submit" fullSize>
                  <T keyName="auth.button.login">Войти</T>
                </Button>
              </Col>
            </Row>
            <Row mb="1.6rem" display="none!important">
              <Col>
                <Button variant="secondary" fullSize>
                  Зарегистрировать фирму
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography variant="mini1">
                  <T keyName="auth.page.terms_of_use_1">Регистрируясь или авторизуясь, вы принимаете</T>
                  &nbsp;
                  <Link css={(theme) => ({ color: theme.color.mainPurple })} to="#">
                    <T keyName="auth.page.terms_of_use_2">Условия пользовательского соглашения</T>
                  </Link>
                  <T keyName="auth.page.terms_of_use_3">, Политики и даете</T>
                  &nbsp;
                  <Link css={(theme) => ({ color: theme.color.mainPurple })} to="#">
                    <T keyName="auth.page.terms_of_use_4">Согласие</T>
                  </Link>
                  &nbsp; <T keyName="auth.page.terms_of_use_5">на обработку персональных данных</T>
                </Typography>
              </Col>
            </Row>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};
