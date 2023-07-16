import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { Typography } from '../typography';

interface TagProps {
  children: ReactNode;
  isSelected: boolean;
}

const Root = styled.div<{ isSelected: boolean }>(({ theme, isSelected }) => {
  return {
    padding: '.6rem 1.6rem',
    backgroundColor: theme.color.bg,
    borderRadius: '18px',
    border: isSelected ? `1px solid ${theme.color.mainPurple}` : 'none',
  };
});

export const Tag: FC<TagProps & JSX.IntrinsicElements['div']> = ({ children, isSelected, ...rest }) => {
  return (
    <Root isSelected={isSelected} {...rest}>
      <Typography variant="body1">{children}</Typography>
    </Root>
  );
};
