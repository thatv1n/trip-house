/* eslint-disable no-nested-ternary */
import { Box } from '@/components/box';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { layout, space } from 'styled-system';
import { Typography } from '../typography';

import ArrowDownBlack from '#/img/arrow-down-black.png';
import ArrowDownGray from '#/img/arrow-down-gray.png';
import ArrowDownPurple from '#/img/arrow-down-purple.png';

type SelectDefaultProps = JSX.IntrinsicElements['select'];

interface SelectProps extends SelectDefaultProps {
  label?: string;
  error?: string;
  width?: string | number;
  minWidth?: string | number;
  mt?: string;
  children: unknown;
  colorArrow?: boolean;
  blackArrow?: boolean;
}

const StyledSelect = styled.select(
  ({ theme, error, colorArrow, blackArrow }) => {
    const isError = (error?.length || 0) > 0;
    return {
      display: 'inline-block',
      width: '100%',
      padding: '1rem 8rem 1rem 2rem',
      appearance: 'none',
      overflow: 'hidden',
      cursor: 'pointer',
      textOverflow: 'ellipsis',
      color: `${theme.color.black} !important`,
      whiteSpace: 'nowrap',
      background: `url(${!colorArrow ? (blackArrow ? ArrowDownBlack : ArrowDownGray) : ArrowDownPurple}) no-repeat `,
      backgroundPosition: !colorArrow ? (blackArrow ? '70% center' : '93% center') : '98% center',
      borderRadius: 10,
      backgroundColor: !colorArrow ? theme.colors.lightWhite0 : theme.colors.white,
      border: !colorArrow ? 0 : `2px solid ${theme.colors.bg}`,
      ...theme.typography.body1,
    };
  },
  layout,
  space,
);

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ value, className, error, onChange, mt, children, colorArrow, blackArrow, ...rest }, ref) => {
    const isError = (error?.length || 0) > 0;
    return (
      <Box display="flex" flexDirection="column" mt={mt}>
        <StyledSelect
          ref={ref}
          className={className}
          id={(rest as any).name}
          value={value}
          error={error}
          onChange={onChange}
          colorArrow={colorArrow}
          blackArrow={blackArrow}
          {...rest}
        >
          {children}
        </StyledSelect>
        {isError && (
          <Typography variant="caption1" mt={2} ml={10} color="mainRed">
            {error}
          </Typography>
        )}
      </Box>
    );
  },
);
