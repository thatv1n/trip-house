import ContentLoader from 'react-content-loader';
import { Box, Flex } from '@/components';
import styled from '@emotion/styled';
import { Icon } from '@/components/icon/icon';

import svgSpinner from '#/icons/spinner.svg';

const RightSideBar = styled.div(() => {
  return {
    width: 343,
    height: 160,
    marginLeft: 20,
  };
});

const WrapLoading = styled.div(() => {
  return {
    maxWidth: '143.3rem',
    width: '100%',
    margin: '0 auto',
    marginBottom: '3rem',
    display: 'grid',
    gridTemplateColumns: '3fr 1fr ',
    '@media (max-width: 734px)': {
      display: 'none',
    },
  };
});

export const LoadingPage = () => {
  return (
    <Box>
      <WrapLoading>
        <Flex flexDirection="column">
          <ContentLoader
            speed={2}
            width="100%"
            height={326}
            backgroundColor="#fff"
            foregroundColor="#ecebeb"
            style={{ marginBottom: 8, borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="833" />
          </ContentLoader>
          <ContentLoader
            speed={2}
            width="100%"
            height={130}
            backgroundColor="#fff"
            foregroundColor="#ecebeb"
            style={{ marginBottom: 8 }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="833" />
          </ContentLoader>
          <ContentLoader
            speed={2}
            width="100%"
            height={80}
            backgroundColor="#fff"
            foregroundColor="#ecebeb"
            style={{ marginBottom: 8 }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="833" />
          </ContentLoader>

          <ContentLoader
            speed={2}
            width="100%"
            height={159}
            backgroundColor="#fff"
            foregroundColor="#ecebeb"
            style={{ marginBottom: 30, borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="833" />
          </ContentLoader>
          <ContentLoader
            speed={2}
            width="100%"
            height={143}
            backgroundColor="#fff"
            foregroundColor="#ecebeb"
            style={{ marginBottom: 8, borderRadius: '1rem' }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="833" />
          </ContentLoader>
        </Flex>
        <RightSideBar>
          <ContentLoader
            speed={2}
            width="100%"
            height={160}
            backgroundColor="#fff"
            foregroundColor="#ecebeb"
            style={{ borderRadius: '1rem' }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="201" />
          </ContentLoader>
        </RightSideBar>
      </WrapLoading>
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
    </Box>
  );
};
