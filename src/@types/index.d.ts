declare const __DEV__: boolean;
declare const __PROD__: boolean;
declare const __BASE_URL__: string;
declare const __BASE_URL_PICTURE__: string;
declare const __WS_URL__: string;
declare const __MINIO_URL__: string;
declare const __MINIO_BUCKET_PICTURE__: string;
declare const __MINIO_BUCKET_CHAT__: string;
declare const __TOLGEE_API_KEY__: string;
declare const __TOLGEE_URL__: string;

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.woff2' {
  const value: string;
  export default value;
}
