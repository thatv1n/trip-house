import { getPaletteByVariant } from '@/utils';
import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { layout, space } from 'styled-system';
import { Variant } from 'styles';

interface ButtonProps {
  /**
   * Variants of color paletters.
   */
  variant?: Variant | 'link';
  icon?: ReactNode;
  fullSize?: boolean;
  children: ReactNode;
}

interface StyledBtnProps {
  variant: Variant | 'link';
  fullSize: boolean;
}

const StyledBtn = styled.button<StyledBtnProps>(
  ({ theme, variant, fullSize }) => {
    const palette = getPaletteByVariant(theme, variant as Variant);
    return {
      backgroundColor: variant === 'primary' ? palette.default : theme.color.white,
      padding: '1rem 2rem',
      borderRadius: 10,
      border: variant === 'primary' || variant === 'link' ? 0 : `1px solid ${theme.color.mainPurple}`,
      cursor: 'pointer',
      transition: 'all 0.5 easy',
      margin: '1rem 0 ',
      width: fullSize ? '100%' : 'auto',
      ...theme.typography.button,
      color: variant === 'primary' ? theme.color.white : theme.color.mainPurple,
      '&:hover': {
        backgroundColor: variant === 'primary' ? palette.hover : theme.color.mainPurple,
        color: variant === 'primary' ? 0 : theme.color.white,
      },
      '&:active': {
        backgroundColor: variant === 'primary' ? palette.active : theme.color.white,
        transform: 'translateY(2px)',
      },
      '&:disabled': {
        backgroundColor: variant === 'primary' ? theme.colors.lightWhite : theme.color.white,
        color: variant === 'primary' ? palette.disabled : theme.color.mainPurple,
      },
    };
  },
  space,
  layout,
);

export const Button: FC<ButtonProps & JSX.IntrinsicElements['button']> = ({
  children,
  fullSize = false,
  variant = 'primary',
  icon,
  ...rest
}) => {
  return (
    <StyledBtn variant={variant} fullSize={fullSize} {...rest}>
      {icon ? <span css={{ marginRight: '1rem' }}>{icon}</span> : null}
      {children}
    </StyledBtn>
  );
};
