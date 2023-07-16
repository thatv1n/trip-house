import { css } from '@emotion/react';
import sfuiDisplayBold from '#/fonts/SFUIDisplay-Bold.woff2';
import sfuiDisplayLight from '#/fonts/SFUIDisplay-Light.woff2';
import sfuiDisplayMedium from '#/fonts/SFUIDisplay-Medium.woff2';
import sfuiDisplayRegular from '#/fonts/SFUIDisplay-Regular.woff2';
import sfuiDisplayThin from '#/fonts/SFUIDisplay-Thin.woff2';

export type Variant = 'primary' | 'secondary';

const fonts = css`
  @font-face {
    font-family: 'SFUIDisplay';
    src: url(\"${sfuiDisplayThin}\") format(\"woff2\");
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: 'SFUIDisplay';
    src: url(\"${sfuiDisplayLight}\") format(\"woff2\");
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'SFUIDisplay';
    src: url(\"${sfuiDisplayRegular}\") format(\"woff2\");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'SFUIDisplay';
    src: url(\"${sfuiDisplayMedium}\") format(\"woff2\");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'SFUIDisplay';
    src: url(\"${sfuiDisplayBold}\") format(\"woff2\");
    font-weight: 700;
    font-style: normal;
  }
`;

export const baseLine = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  html {
    font-size: 62.5%;
    background-color: rgb(245, 245, 245);
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  :focus,
  :focus-visible {
    outline: none;
  }
  * {
    box-sizing: border-box;
  }
  ${fonts};
  * {
    font-family: SFUIDisplay, Times!important;
  }
`;

export const colSpanInputForm = { sm: 6, md: 4, lg: 3 };
