import styled from '@emotion/styled';
import { Box } from '../box';

export const Container = styled(Box)(({ theme }) => {
  return {
    width: '100%',
    maxWidth: theme.grid.maxWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0 1.5rem',
    '@media (max-width: 734px)': {
      padding: '0',
      paddingLeft: '0',
    },
  };
});
