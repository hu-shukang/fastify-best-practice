import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('userTbl')
    // `id` 是 uuid 类型的主键
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    // 几个非空的 varchar 字段
    .addColumn('username', 'varchar(100)', (col) => col.notNull())
    .addColumn('address', 'varchar(255)', (col) => col.notNull())
    .addColumn('email', 'varchar(100)', (col) => col.notNull())
    // 非空的 timestamptz 字段
    .addColumn('birthday', 'timestamptz', (col) => col.notNull())
    // 带默认值的 createdAt 字段
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
    // 带默认值、可为空的 updatedAt 字段 (不加 .notNull() 即为可空)
    .addColumn('updatedAt', 'timestamptz')
    // 可为空的 deleteAt 字段
    .addColumn('deleteAt', 'timestamptz')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('userTbl').execute();
}
