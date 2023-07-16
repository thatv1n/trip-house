import styled from '@emotion/styled';
import { Box } from '../box';

export const Section = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.colors.white,
    padding: '3rem',
    marginBottom: '1.5rem',
    borderRadius: '1rem',
    overflow: 'hidden',
  };
});
