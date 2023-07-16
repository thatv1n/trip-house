import styled from '@emotion/styled';
import { Flex } from '../box';

export const Row = styled(Flex)(({ theme }) => {
  return {
    flex: '1 0 100%',
    flexWrap: 'wrap',
    marginLeft: `calc(${theme.grid.gutter} / -2)`,
    marginRight: `calc(${theme.grid.gutter} / -2)`,
  };
});
