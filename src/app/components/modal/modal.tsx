import styled from '@emotion/styled';
import { FC, useEffect } from 'react';

import { Col, Row } from '../grid';
import { Typography } from '../typography';
import { IModal } from './modal.types';

const WrapModalSuccess = styled.div(({ theme }) => {
  return {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: '5',
    left: 0,
    top: 0,
    background: theme.color.transparentGray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

const WinModalSuccess = styled.div(({ theme }) => {
  return {
    maxWidth: 270,
    top: 0,
    right: 0,
    overflowY: 'hidden',
    overflowX: 'hidden',
    background: theme.color.white,
    zIndex: 2,
    borderRadius: 10,
  };
});

export const Modal: FC<IModal> = ({ isModalClose, title, body }) => {
  const bodyMain = document.querySelector('body');

  useEffect(() => {
    if (bodyMain) bodyMain.style.overflow = 'hidden';

    return () => {
      if (bodyMain) bodyMain.style.overflow = 'auto';
    };
  }, [bodyMain]);

  return (
    <WrapModalSuccess onClick={(e: any) => isModalClose(e)} data-target="close-modal">
      <WinModalSuccess>
        <Row mt="1.9rem" mb="0.2rem">
          <Col display="flex" justifyContent="center">
            <Typography fontWeight="bold" fontSize="1.7rem">
              {title}
            </Typography>
          </Col>
        </Row>
        <Row mb="1.7rem">
          <Col>
            <Typography
              fontSize="1.3rem"
              display="block"
              color="rgba(0, 0, 0, 0.5)"
              padding="0 1.6rem"
              textAlign="center"
              line-height=" 1.8rem"
              letter-spacing=" -0.078px"
            >
              {body}
            </Typography>
          </Col>
        </Row>
        <Row css={{ borderTop: '1px solid rgba(0, 0, 0, 0.35)', cursor: 'pointer' }}>
          <Col>
            <Typography
              fontSize="1.7rem"
              display="block"
              color="#6C27AB"
              textAlign="center"
              data-target="close-modal"
              padding="1.1rem 0"
              onClick={(e: any) => isModalClose(e)}
            >
              Хорошо
            </Typography>
          </Col>
        </Row>
      </WinModalSuccess>
    </WrapModalSuccess>
  );
};
