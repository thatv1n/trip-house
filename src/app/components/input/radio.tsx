import styled from '@emotion/styled';
import { forwardRef, ReactNode } from 'react';
import { Theme } from 'theme';
import { Flex } from '../box';
import { Typography } from '../typography';
import pngChecked from '#/img/checked.png';

type InputProps = JSX.IntrinsicElements['input'];

interface RadioProps extends InputProps {
  label?: ReactNode;
  mr?: string;
}

const StyledRadio = styled.input(({ theme }) => {
  return {
    position: 'absolute',
    zIndex: -1,
    opacity: 0,
    '&:checked + label:before': {
      background: `url(${pngChecked}) center/cover no-repeat`,
    },
  };
});

const cssLabel = (theme: Theme) => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    '&:before': {
      content: '""',
      display: 'inline-block',
      width: '2.4rem',
      height: '2.4rem',
      margin: '0 1rem 0 0',
      border: `1px solid ${theme.color.lightGray}`,
      borderRadius: '50px',
    },
  };
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, name, mr, ...rest }, ref) => {
  return (
    <Flex mr={mr}>
      <StyledRadio {...rest} ref={ref} type="radio" name={name} />
      <Typography htmlFor={rest.id} css={cssLabel} as="label" variant="body1">
        {label}
      </Typography>
    </Flex>
  );
});
