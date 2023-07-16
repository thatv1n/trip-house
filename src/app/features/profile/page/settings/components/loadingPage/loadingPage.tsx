import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from '@emotion/styled';

import { Flex } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgSpinner from '#/icons/spinner.svg';

const Root = styled.div(() => {
  return {
    maxWidth: '123rem',
    width: '100%',
    margin: '0 auto',
    padding: '0 5rem',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '2.1fr 1fr ',
    '@media (max-width: 734px)': {
      display: 'none',
    },
  };
});

const Body = styled.div(() => {
  return {
    maxWidth: '77.7rem',
    borderRadius: '1rem',
    marginBottom: '2rem',
    marginRight: '2rem',
    '@media (max-width: 734px)': {
      minHeight: 'auto',
      borderRadius: '0',
      marginBottom: '1rem',
      marginRight: '0',
    },
  };
});

const Rightbar = styled.div(() => {
  return {
    borderRadius: '1rem',
    minWidth: '23.5rem',
    height: '7.9rem',
    '@media (max-width: 734px)': {
      display: 'none',
    },
  };
});

export const LoadingPage = () => {
  return (
    <>
      <Root>
        <Body>
          <ContentLoader
            speed={2}
            width="100%"
            height="1340"
            backgroundColor="#fff"
            foregroundColor="#ecebeb"
            style={{ borderRadius: '1rem' }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="1340" />
          </ContentLoader>
        </Body>
        <Rightbar>
          <ContentLoader
            speed={2}
            width="100%"
            height={79}
            backgroundColor="#fff"
            foregroundColor="#ecebeb"
            style={{ borderRadius: '1rem' }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="137" />
          </ContentLoader>
        </Rightbar>
      </Root>
      <Flex justifyContent="center" mt="2rem">
        <Icon
          source={svgSpinner}
          css={{
            display: 'none',
            width: '4.4rem',
            height: '4.4rem',
            '@media (max-width: 734px)': {
              display: 'block',
            },
          }}
        />
      </Flex>
    </>
  );
};
