import React from 'react';
import ContentLoader from 'react-content-loader';

import { Flex } from '@/components';

import svgSpinner from '#/icons/spinner.svg';
import { Icon } from '@/components/icon/icon';

const LoadingBlock = () => {
  return (
    <Flex flexDirection="column" css={{ '@media (max-width: 768px)': { display: 'none' } }}>
      <ContentLoader
        speed={2}
        width="100%"
        height={410}
        backgroundColor="#FFF"
        foregroundColor="#ecebeb"
        style={{ marginTop: 20, borderRadius: '1rem', marginBottom: '2rem' }}
      >
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="875" />
      </ContentLoader>
    </Flex>
  );
};

export const ProfileEventsLoading = () => {
  const skeletons = [...new Array(4)].map((_, index) => (
    <div key={index} style={{ marginRight: '2rem', marginTop: '-2rem' }}>
      <LoadingBlock />
    </div>
  ));

  return (
    <>
      {skeletons}
      <Flex justifyContent="center">
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
