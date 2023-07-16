import styled from '@emotion/styled';
import { ComponentProps, forwardRef } from 'react';
import { Theme } from 'theme';
import { Flex } from '../box';
import { Typography } from '../typography';

type InputProps = JSX.IntrinsicElements['input'];

interface CheckboxProps extends InputProps, ComponentProps<typeof StyledCheckbox> {
  label?: string;
  mt?: string;
}

function getBackgroundImage(color: string): string {
  return `url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="%23${color.slice(1)}" xmlns="http://www.w3.org/2000/svg"><rect width="12" height="12" rx="3"/></svg>')`;
}

const StyledCheckbox = styled.input(({ theme }) => {
  return {
    position: 'absolute',
    zIndex: -1,
    opacity: 0,
    '&:checked + label': {
      color: theme.color.darkGray,
    },
    '&:checked + label:hover': {
      color: theme.color.darkGray0,
    },
    '&:checked + label:before': {
      borderColor: theme.palette.secondary.default,
      backgroundImage: getBackgroundImage(theme.palette.secondary.default),
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: '75%',
    },
    '&:checked + label:hover:before': {
      borderColor: theme.palette.secondary.hover,
      backgroundImage: getBackgroundImage(theme.palette.secondary.hover),
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
      width: '1.6rem',
      height: '1.6rem',
      margin: '0 .5rem 0 0',
      border: `1px solid ${theme.color.lightGray}`,
      borderRadius: '3px',
      backgroundColor: theme.color.white,
    },
    '&:hover': {
      color: theme.color.darkBlue0,
    },
    '&:hover:before': {
      borderColor: theme.color.darkBlue0,
    },
  };
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, name, mt, ...rest }, ref) => {
  return (
    <Flex mt={mt}>
      <StyledCheckbox ref={ref} type="checkbox" id={name} name={name} {...rest} />
      <Typography htmlFor={name} css={cssLabel} as="label" variant="subtitle3">
        {label}
      </Typography>
    </Flex>
  );
});
