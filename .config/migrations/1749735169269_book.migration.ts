import { type Kysely, sql } from 'kysely';

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('bookTbl')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('title', 'varchar(100)', (col) => col.notNull())
    .addColumn('content', 'varchar(2000)', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.references('userTbl.id').onDelete('no action').notNull())
    .addColumn('createdAt', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updatedAt', 'timestamptz')
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('bookTbl').execute();
}
