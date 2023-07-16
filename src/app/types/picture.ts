import { BasicModel } from './common';

export interface ThumbnailEntity extends BasicModel {
  width: number;
  height: number;
  extension: string;
  name: string;
  originalName: string;
  fullName: string;
}

export interface PictureEntity extends BasicModel {
  thumbnails: ThumbnailEntity[];
}
