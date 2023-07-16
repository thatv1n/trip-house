import { Col, Row, Typography } from '@/components';
import styled from '@emotion/styled';
import { FC, useState } from 'react';

const Root = styled.div(({ theme }) => {
  return {
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    minWidth: '23.5rem',
    paddingTop: '1rem',
    height: '7.9rem',
    '@media (max-width: 734px)': {
      display: 'none',
    },
  };
});

export const Rightbar: FC = () => {
  const [activeItem, setActiveItem] = useState(0);
  const itemMenu = ['Основные'];

  return (
    <Root>
      {itemMenu.map((item, i) => (
        <Col
          key={i}
          onClick={() => setActiveItem(i)}
          css={i === activeItem ? { background: 'rgba(108, 39, 171, 0.1)' } : { cursor: 'pointer' }}
        >
          <Row css={{ padding: '1.7rem 2rem' }}>
            <Typography css={{ fontSize: '1.6rem' }}>{item}</Typography>
          </Row>
        </Col>
      ))}
    </Root>
  );
};
