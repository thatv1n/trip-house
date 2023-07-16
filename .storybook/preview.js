import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';

import { theme } from '../src/theme';
import { baseLine } from '../src/styles';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Global styles={baseLine} />
      <Story />
    </ThemeProvider>
  ),
];
