import { Option, PictureEntity } from '@/types';
import noAvatar from '#/img/no-avatar.png';

export function getDefaultPictureUrl(picture?: Option<PictureEntity>, defaultPicture = noAvatar): string {
  return picture?.thumbnails[0]?.fullName ? getFileUrl(picture?.thumbnails[0]?.fullName) : defaultPicture;
}

export function getChatPictureUrls(picture: PictureEntity): string[] {
  return picture.thumbnails.map(({ fullName }) => getFileUrl(fullName, __MINIO_BUCKET_CHAT__));
}

export function getChatAudioUrl(audioUrl: string): string {
  return getFileUrl(audioUrl, __MINIO_BUCKET_CHAT__);
}

export function getFileUrl(name: string, bucket = __MINIO_BUCKET_PICTURE__): string {
  return `${__MINIO_URL__}/${bucket}/${name}`;
}
