/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Col, Input, Row, Typography } from '@/components';

import { loginAdminAction } from './auth-admin.action';
import { isLoginAdminSelector } from './auth-admin.selectors';

const Root = styled.div(({ theme }) => {
  return {
    width: 595,
    background: theme.color.white,
    borderRadius: 10,
    padding: 30,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };
});

const InputParent = styled(Col)(({ theme }) => ({
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

export const AuthAdminIndexPage: FC<unknown> = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoginAdmin = useSelector(isLoginAdminSelector);
  useEffect(() => {
    if (isLoginAdmin) {
      navigate('/admin-panel');
    }
  }, [isLoginAdmin]);

  const onSubmit = (data: any): void => {
    dispatch(loginAdminAction.started(data));
  };

  return (
    <Root>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row mb="3rem">
          <Col display="flex" justifyContent="center">
            <Typography variant="h1">Вход в админ-панель</Typography>
          </Col>
        </Row>
        <Row mb="1rem" css={{ jusifyContent: 'center' }}>
          <InputParent>
            <Input
              placeholder="Введите логин"
              {...register('login', {
                required: true,
              })}
            />
          </InputParent>
        </Row>
        <Row mb="6.5rem" css={{ jusifyContent: 'center' }}>
          <InputParent>
            <Input
              placeholder="Введите пароль"
              type="password"
              {...register('password', {
                required: true,
              })}
            />
          </InputParent>
        </Row>
        <Row mb="1.6rem">
          <Col>
            <Button type="submit" fullSize>
              Войти
            </Button>
          </Col>
        </Row>
      </form>
    </Root>
  );
};
