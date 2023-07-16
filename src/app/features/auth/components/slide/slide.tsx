import { Box, Flex, Typography } from '@/components';
import { FC, ReactNode } from 'react';

interface SlideProps {
  img: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export const Slide: FC<SlideProps> = ({ img, title, description }) => {
  return (
    <Flex
      css={{
        '@media (max-width: 734px)': {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <Box>{img}</Box>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="30rem"
        css={{
          marginLeft: '5.8rem',
          '@media (max-width: 734px)': {
            marginLeft: '2.8rem',
          },
        }}
      >
        <Box mb="1.5rem">
          <Typography variant="h1" textAlign="center">
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" textAlign="center" display="inline-block" width="100%">
            {description}
          </Typography>
        </Box>
      </Flex>
    </Flex>
  );
};
