import { css } from '@emotion/react';
import { FC } from 'react';
import { Link as LinkRouter, LinkProps } from 'react-router-dom';

export const linkStyle = css({
  textDecoration: 'none',
  color: 'inherit',
});

export const Link: FC<LinkProps> = ({ children, ...rest }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LinkRouter css={linkStyle} {...rest}>
      {children}
    </LinkRouter>
  );
};
