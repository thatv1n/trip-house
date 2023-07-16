import React from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Flex } from '@/components';
import { getUserSelector } from '@/features/auth/auth.selectors';

import svgSpinner from '#/icons/spinner.svg';
import { Icon } from '@/components/icon/icon';

export const LoadingProfile = () => {
  const user = useSelector(getUserSelector);
  const { pathname } = useLocation();
  const id = pathname.split('/').filter((item) => !!item)[1];
  return (
    <>
      <>
        <Flex
          marginRight="2rem"
          css={{
            '@media (max-width: 734px)': {
              display: 'none',
            },
          }}
        >
          <ContentLoader
            speed={2}
            width="100%"
            height={456}
            backgroundColor="#FFF"
            foregroundColor="#ecebeb"
            style={{ borderRadius: '1rem' }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="547" height="520" />
          </ContentLoader>
        </Flex>
        <Flex
          flexDirection="column"
          css={{
            '@media (max-width: 734px)': {
              display: 'none',
            },
          }}
        >
          <ContentLoader
            speed={2}
            width="100%"
            height={264}
            backgroundColor="#FFF"
            foregroundColor="#ecebeb"
            style={{ borderRadius: '1rem', marginBottom: '2rem' }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="939" height="427" />
          </ContentLoader>
          {user?.id === id && (
            <ContentLoader
              speed={2}
              width="100%"
              height={80}
              backgroundColor="#FFF"
              foregroundColor="#ecebeb"
              style={{ borderRadius: '1rem', marginBottom: '2rem' }}
            >
              <rect x="0" y="0" rx="0" ry="0" width="939" height="427" />
            </ContentLoader>
          )}
          <ContentLoader
            speed={2}
            width="100%"
            height={638}
            backgroundColor="#FFF"
            foregroundColor="#ecebeb"
            style={{ borderRadius: '1rem', marginBottom: '2rem' }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="939" height="833" />
          </ContentLoader>
        </Flex>
      </>
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
