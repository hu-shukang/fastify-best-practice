import { ColumnType } from 'kysely';

// 定义 user_tbl 表的接口
export interface UserTbl {
  // `id` 是 uuid 类型。在 SQL 中没有 DEFAULT 子句 (如 gen_random_uuid()),
  // 这意味着通常由应用程序在插入数据前生成 UUID。因此它不是数据库生成的列。
  id: string;

  username: string;
  address: string;
  email: string;

  // `timestamptz` 在 TypeScript 中直接对应 `Date` 类型
  birthday: ColumnType<Date, Date | string, Date | string>;

  // `createdAt` 列：在数据库中有默认值且不为空。
  // ColumnType<SelectType, InsertType, UpdateType>
  // - SelectType: `Date` (查询时总是返回 Date)
  // - InsertType: `string | undefined` (插入时此字段是可选的)
  // - UpdateType: `never` (通常你不会去更新 "createdAt" 字段)
  createdAt: Date | null;

  // `updatedAt` 列：在数据库中有默认值且可为空。
  // - SelectType: `Date | null` (查询时可能返回 Date 或 null)
  // - InsertType: `string | undefined` (插入时可选)
  // - UpdateType: `string | Date | undefined` (更新时可选，可以设置为新时间)
  updatedAt: ColumnType<Date | null, string | Date | null, string | Date>;

  // `deleteAt` 列：一个可为空的时间戳，用于软删除。
  deleteAt: Date | null;
}
