/* eslint-disable react/jsx-props-no-spreading */
import { Button, Col, Container, Flex, Input, Row, Typography } from '@/components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { registerAuthAction } from './auth.actions';

export const AuthRegisterPage: FC<unknown> = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      login: '',
    },
  });
  const { authId } = useParams();
  const dispatch = useDispatch();
  const handleFormSubmit = ({ login }: { login: string }): void => {
    dispatch(registerAuthAction.started({ login, id: authId! }));
  };
  return (
    <Flex
      css={{
        '@media (max-width: 734px)': {
          height: '100vh',
        },
      }}
    >
      <Container>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex
            flexDirection="column"
            css={{
              '@media (max-width: 734px)': {
                marginBottom: '50vh',
              },
            }}
          >
            <Row mb="3rem">
              <Col display="flex" justifyContent="center">
                <Typography variant="h1">Ведите ваш никнейм</Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input {...register('login', { required: true })} />
              </Col>
            </Row>
            <Row mb="7rem" mt="1rem">
              <Col>
                <Typography variant="mini1">Ваш уникальный никнейм</Typography>
              </Col>
            </Row>
          </Flex>
          <Row mb="1.6rem">
            <Col>
              <Button type="submit" fullSize>
                Зарегистрироваться
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Flex>
  );
};
