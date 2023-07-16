import styled from '@emotion/styled';
import { color, flexbox, layout, space, typography, variant } from 'styled-system';

export const Typography = styled.div(
  {
    display: 'inline',
  },
  variant({
    scale: 'typography',
    prop: 'variant',
  }),
  space,
  layout,
  color,
  flexbox,
  typography,
);
