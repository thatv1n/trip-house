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

export interface Avatar {
  thumbnails: Thumbnail[];
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

export interface UserSettingResponse {
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
