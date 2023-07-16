import { assetsDir, libsDir, srcDesktopDir, srcDir } from './constants';
import { resolve } from 'path';

export const aliasDefaultConfig = {
  '@': srcDesktopDir,
  '#': assetsDir,
  '@tsfsa-ro': resolve(libsDir, 'tsfsa-ro'),
  '@ro-loading': resolve(libsDir, 'redux-loading'),
  types: resolve(srcDir, 'types'),
  src: srcDir,
};
