import svgEmail from '#/icons/warning.svg';
import { Box } from '@/components/box';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { T } from '@tolgee/react';
import { forwardRef, ReactNode, useState } from 'react';
import { layout, space } from 'styled-system';
import { Icon } from '../icon/icon';
import { Typography } from '../typography';

type InputDefaultProps = JSX.IntrinsicElements['input'];

interface InputProps extends InputDefaultProps {
  label?: ReactNode;
  error?: string;
  width?: string | number;
  minWidth?: string | number;
  mt?: string;
  wth?: string;
  icon?: ReactNode;
}

const iconContainerCss = css({
  position: 'absolute',
  pointerEvents: 'none',
  bottom: 0,
  left: '2rem',
  height: '100%',
  width: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledInput = styled.input<InputProps>(
  ({ theme, error, icon }) => {
    const isError = (error?.length || 0) > 0;
    return {
      position: 'relative',
      width: '100%',
      padding: '1rem 2rem',
      paddingLeft: icon ? '5rem' : '2rem',
      borderRadius: 10,
      backgroundColor: theme.colors.lightWhite0,
      border: 0,
      ...theme.typography.body1,
      color: isError ? theme.colors.mainRed : theme.typography.body1,
      [`& + ${iconContainerCss.name}`]: {
        color: theme.color.lightGray,
      },
      [`&:focus + ${iconContainerCss.name}`]: {
        color: theme.palette.secondary.default,
      },
    };
  },
  layout,
  space,
);

const HoverEmail = styled.div(({ theme }) => {
  return {
    content: `'Укажите почту, чтобы иметь возможность восстановить аккаунт при утере доступа к номеру телефона'`,
    position: 'absolute',
    top: '25px',
    whiteSpace: 'nowrap',
    left: '37rem',
    transform: 'translateX(-50%)',
    padding: '1.2rem 2.5rem',
    backgroundColor: theme.color.white,
    color: theme.color.black,
    borderRadius: ' 5px',
    zIndex: 5,
    boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.16)',
  };
});

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, className, error, label = '', placeholder = 'Не указано', onChange, wth, mt, icon, ...rest }, ref) => {
    const isError = (error?.length || 0) > 0;
    const [isMove, setIsMove] = useState(false);
    return (
      <Box display="flex" css={{ position: 'relative', width: wth }} flexDirection="column" mt={mt}>
        {label && (
          <Typography
            as="label"
            variant="body1"
            mb={2}
            color={isError ? 'mainRed' : undefined}
            htmlFor={(rest as any).name}
            position="relative"
          >
            {label}
            {label === 'Email' && (
              <Box
                onMouseOver={() => setIsMove(true)}
                onMouseOut={() => setIsMove(false)}
                css={{ display: 'inline-block' }}
              >
                <Icon
                  source={svgEmail}
                  css={() => ({
                    width: 16,
                    display: 'inline-block',
                    marginLeft: '0.9rem',
                    position: 'relative',
                    top: '0.2rem',
                    cursor: 'pointer',
                  })}
                />
                {isMove && (
                  <HoverEmail>
                    <T keyName="profile.setting.email_clue">
                      Укажите почту, чтобы иметь возможность восстановить аккаунт при утере доступа к номеру телефона
                    </T>
                  </HoverEmail>
                )}
              </Box>
            )}
          </Typography>
        )}
        <StyledInput
          ref={ref}
          className={className}
          id={(rest as any).name}
          value={value}
          error={error}
          placeholder={placeholder}
          onChange={onChange}
          icon={!!icon}
          {...rest}
        />
        {icon ? <div css={iconContainerCss}>{icon}</div> : null}
        {isError && (
          <Typography variant="caption1" mt={2} ml={10} color="mainRed">
            {error}
          </Typography>
        )}
      </Box>
    );
  },
);
