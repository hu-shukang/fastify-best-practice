import { DBCommon, dbCommonDesc, DBCommonType } from './common.model';

export type User = {
  id: string;
  name: string;
  address: string;
} & DBCommon;

export const userDesc = {
  id: 'ユーザID',
  name: 'ユーザ名',
  address: '住所',
  ...dbCommonDesc,
};

export type UserInput = Omit<User, 'id' | DBCommonType>;
export type UserIdInput = Pick<User, 'id'>;
export type UserQueryInput = Partial<Pick<User, 'name' | 'address'>>;
