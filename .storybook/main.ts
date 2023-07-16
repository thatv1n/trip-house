import type { StorybookConfig } from '@storybook/core-common';
import { append } from 'ramda';
import { aliasDefaultConfig } from '../webpack/common.config';

// const config: StorybookConfig = {
const config = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.story.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  babel: (config: any) => ({
    ...config,
    plugins: append('@emotion', config.plugins),
    presets: append('@emotion/babel-preset-css-prop', config.presets),
  }),
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  webpackFinal: async (config: any) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...aliasDefaultConfig,
        },
      },
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter((rule: any) => !rule.test.test('voc.svg')),
          {
            test: /\.(svg)$/,
            use: {
              loader: 'svg-inline-loader',
            },
          },
          {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'assets/'
                }
              },
            ],
          },
          {
            test: /\.(png|jp(e*)g|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'assets/[name]-[hash].[ext]',
                },
              },
            ],
          },
        ],
      },
    };
  }
}

module.exports = config;
