/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Col, Container, Flex, Input, Row, Typography } from '@/components';
import { timeDiffMoreCurrent } from '@/utils';
import { T, useTranslate } from '@tolgee/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { confirmSmsAuthAction, getAuthAction, sendSmsAuthAction } from './auth.actions';

const RESEND_SEC = 32;

export const AuthConfirmSmsPage: FC<unknown> = () => {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const [diffState, setDiff] = useState(-1);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      code: '',
    },
  });

  const { phoneNumber, createdAt, code } = useSelector((state: any) => {
    const { phoneNumber, createdAt, code } = state?.auth?.auth || {};
    return { phoneNumber, createdAt, code };
  });
  const { authId } = useParams();
  useEffect(() => {
    let timer: NodeJS.Timer | null = null;
    if (createdAt) {
      timer = setTimeout(() => {
        const diff = timeDiffMoreCurrent(new Date(createdAt));
        if (diff < RESEND_SEC + 1) {
          setDiff(diff);
        }
      }, 1000);
    }
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [createdAt, diffState]);
  useEffect(() => {
    dispatch(getAuthAction.started(authId!));
    // TODO (luchko): remove after release.
    if (code) {
      alert(code);
    }
  }, [authId, code]);

  const handleFormSubmit = ({ code }: { code: string }) => {
    dispatch(confirmSmsAuthAction.started({ code, id: authId! }));
  };
  const handleResendSms = () => {
    dispatch(sendSmsAuthAction.started(phoneNumber));
  };
  return (
    <Flex
      css={{
        '@media (max-width: 734px)': {
          height: '90dvh',
        },
      }}
    >
      <Container>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                  marginBottom: '55dvh',
                },
              }}
            >
              <Row mb="3rem">
                <Col display="flex" justifyContent="center">
                  <Typography variant="h1">
                    <T keyName="auth.input.verification_code">Проверочный код</T>
                  </Typography>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    placeholder={t('auth.input.verification_code', 'Проверочный код')}
                    {...register('code', { required: true, maxLength: 4, minLength: 4 })}
                  />
                </Col>
              </Row>
              {diffState < RESEND_SEC && diffState !== -1 ? (
                <Row mt="1rem">
                  <Col>
                    <Typography variant="mini1">
                      <T keyName="auth.page.resend_code" params={{ second: RESEND_SEC - diffState }}>
                        Код можно выслать повторно через 30 секунд
                      </T>
                    </Typography>
                  </Col>
                </Row>
              ) : null}
              <Row mt="2.5">
                <Col>
                  <Button
                    variant="link"
                    disabled={!phoneNumber || (diffState < RESEND_SEC && diffState !== -1)}
                    fullSize
                    onClick={handleResendSms}
                  >
                    <T keyName="auth.button.resend_code">Отправить код повторно</T>
                  </Button>
                </Col>
              </Row>
            </Flex>
            <Flex flexDirection="column">
              <Row mb="1.6rem">
                <Col>
                  <Button type="submit" fullSize>
                    <T keyName="auth.button.confirm">Подтвердить</T>
                  </Button>
                </Col>
              </Row>
            </Flex>
          </Flex>
        </form>
      </Container>
    </Flex>
  );
};
