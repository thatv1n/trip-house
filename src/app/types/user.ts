import { BasicModel, Lang, Option } from './common';
import { PictureEntity } from './picture';

export interface InterestEntity extends BasicModel {
  title: string;
}

export type UserSex = 'male' | 'female';

export interface UserEntity extends BasicModel {
  firstName: Option<string>;
  lastName: Option<string>;
  sex: Option<UserSex>;
  age: Option<Date>;
  city: Option<string>;
  description: Option<string>;
  avatar: Option<PictureEntity>;
  email: string;
  phoneNumber: string;
  login: string;
  lastOnline: Date;
  interests: InterestEntity[];
  lang: Lang;
}
