export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type DBCommon = {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

/** type DBCommonType = 'createdAt' | 'updatedAt' | 'deletedAt'; */
export type DBCommonType = keyof DBCommon;

export const dbCommonDesc = {
  createdAt: '作成日時',
  updatedAt: '更新日時',
  deletedAt: '削除日時',
};
