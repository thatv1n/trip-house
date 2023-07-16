/* eslint-disable import/no-extraneous-dependencies */
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';

import {
  __BASE_URL__,
  __BASE_URL_PICTURE__,
  __DEV__,
  __PROD__,
  rootDir,
  srcDesktopDir,
  distDir,
  __WS_URL__,
  __MINIO_URL__,
  __MINIO_BUCKET_PICTURE__,
  __MINIO_BUCKET_CHAT__,
  __TOLGEE_API_KEY__,
  __TOLGEE_URL__,
} from './constants';
import { aliasDefaultConfig } from './common.config';

declare module 'webpack' {
  // eslint-disable-next-line no-shadow
  interface Configuration {
    devServer?: WebpackDevServer.Configuration;
  }
}

const config: Configuration = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
    alias: aliasDefaultConfig,
  },
  entry: path.resolve(srcDesktopDir, 'main.tsx'),
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(rootDir, 'babel.config.js'),
          },
        },
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
      {
        test: /\.(svg)$/,
        use: {
          loader: 'svg-inline-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: distDir,
    },
    historyApiFallback: true,
    compress: true,
    hot: false,
    port: 4000,
  },
  stats: {
    children: true,
  },
  optimization: {
    minimize: __PROD__,
  },
  output: {
    path: distDir,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? 'https://test-project.site/' : 'http://localhost:4000/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcDesktopDir, 'index.html'),
      filename: path.resolve(distDir, 'index.html'),
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
      __DEV__,
      __PROD__,
      __BASE_URL__,
      __BASE_URL_PICTURE__,
      __WS_URL__,
      __MINIO_URL__,
      __MINIO_BUCKET_PICTURE__,
      __MINIO_BUCKET_CHAT__,
      __TOLGEE_API_KEY__,
      __TOLGEE_URL__,
    }),
  ],
};

export default config;
