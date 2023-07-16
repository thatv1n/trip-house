export interface Thumbnail {
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

export interface Picture {
  thumbnails: Thumbnail[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Thumbnail2 {
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

export interface Avatar {
  thumbnails: Thumbnail2[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Interest {
  title: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  firstName: string;
  lastName: string;
  sex: string;
  age: Date;
  city: string;
  description: string;
  avatar: Avatar;
  email: string;
  phoneNumber: string;
  login: string;
  lastOnline: Date;
  interests: Interest[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WallType {
  text: string;
  picture: Picture;
  author: Author;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  meta: string;
}

export interface WallProps {
  id: string;
  getMyProfile: () => void;
}
