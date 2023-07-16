export interface ModalProfileGalleryResponse {
  width: number;
  height: number;
  extension: string;
  name: string;
  originalName: string;
  fullName: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedForGallery {
  original: string;
  thumbnail: string;
}
