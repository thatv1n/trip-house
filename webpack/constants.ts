import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: '../.env' });

export const __DEV__ = process.env.NODE_ENV === 'development';
export const __PROD__ = process.env.NODE_ENV === 'production';
export const __BASE_URL__ = __DEV__ ? "'http://localhost:1337'" : "'https://test-project.site/api'";
export const __BASE_URL_PICTURE__ = __DEV__
  ? "'http://localhost:9000/pictures'"
  : "'https://s3.test-project.site/pictures'";
export const __MINIO_URL__ = __DEV__ ? "'http://localhost:9000'" : "'https://s3.test-project.site'";
export const __MINIO_BUCKET_PICTURE__ = "'pictures'";
export const __MINIO_BUCKET_CHAT__ = "'chat'";
export const __WS_URL__ = __DEV__ ? "'ws://localhost:1338'" : "'wss://test-project.site'";
export const __TOLGEE_API_KEY__ = process.env.TOLGEE_API_KEY ?? __DEV__
  ? "'tgpak_gfptkyllmrwwqy3egb2dg23bmzzhe2zxgi3wimbzgm4hi'"
  : "'tgpak_gfptm3lgmfzhmzjyg44dcyrtmy4wk4bxg4yhez3lgzzhe'";
export const __TOLGEE_URL__ = process.env.TOLGEE_URL ?? __DEV__ ? "'http://localhost:8085'" : "'https://tolgee.test-project.site'";

export const rootDir = resolve(__dirname, '../');
export const distDir = resolve(rootDir, 'dist');
export const srcDir = resolve(rootDir, 'src');
export const libsDir = resolve(srcDir, 'libs');
export const srcDesktopDir = resolve(srcDir, 'app');
export const assetsDir = resolve(srcDir, 'assets');
