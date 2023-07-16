import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { Button, Flex, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgClose from '#/icons/close.svg';
import { aboutEventApi } from '../event.api';

interface TypeProps {
  isModalReportedClose: (data: any) => void;
  setModalReported: (data: boolean) => void;
  setBodyModal: (data: any) => void;
  setModal: (data: boolean) => void;
}

const WrapModalReported = styled.div(({ theme }) => {
  return {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: '1',
    left: 0,
    top: 0,
    backgroundColor: theme.color.transparentGray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

const ModalReportedMain = styled.div(({ theme }) => {
  return {
    width: '100%',
    maxWidth: 500,
    background: theme.color.white,
    zIndex: 2,
    borderRadius: 10,
    padding: 40,
    '@media (max-width: 734px)': { padding: 15, borderRadius: 0, width: '90%' },
  };
});

export const ModalReported: FC<TypeProps> = ({ isModalReportedClose, setModalReported, setBodyModal, setModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const location = useLocation().pathname.split('/');

  const onSubmit = (data: any): void => {
    const params = new URLSearchParams();
    params.set('text', data.text);
    aboutEventApi.complaintEvent(location[location.length - 1], params);
    reset();
    setBodyModal({ title: 'Жалоба', body: 'Жалоба отправлена на рассмотрение' });
    setModal(true);
    setModalReported(false);
  };
  const body = document.querySelector('body');

  useEffect(() => {
    if (body) body.style.overflow = 'hidden';

    return () => {
      if (body) body.style.overflow = 'auto';
    };
  }, [body]);

  return (
    <WrapModalReported onClick={(e) => isModalReportedClose(e)} data-target="wrapperModalReported">
      <ModalReportedMain>
        <Flex css={{ position: 'relative' }}>
          <Flex alignItems="center">
            <Typography variant="h1" mr="3rem">
              Введите текст
            </Typography>
          </Flex>
          <Flex onClick={(e: HTMLButtonElement) => isModalReportedClose(e)} css={{ position: 'absolute', right: 0 }}>
            <Icon source={svgClose} css={{ width: 12, marginLeft: '2.25rem', cursor: 'pointer' }} />
          </Flex>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ReactTextareaAutosize
            minRows={4}
            maxRows={10}
            placeholder="Опишите жалобу"
            css={(theme) => ({
              resize: 'none',
              padding: '1.2rem 1.6rem',
              borderRadius: '1.2rem',
              width: '100%',
              border: `1px solid ${theme.color.bg}`,
              margin: '3rem 0',
              fontSize: '1.4rem',
              background: theme.color.bg,
            })}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('text', {
              required: true,
            })}
          />
          <Button fullSize type="submit">
            Отправить
          </Button>
        </form>
      </ModalReportedMain>
    </WrapModalReported>
  );
};
