import { Kysely, PostgresDialect } from 'kysely';
// this is the Database interface we defined earlier
import { Pool } from 'pg';

import { logger } from '@/utils/logger.util';

import { Database } from './types';

export let db: Kysely<Database>;

export const createDB = () => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      max: 10,
    }),
  });

  db = new Kysely<Database>({
    dialect,
    log(event): void {
      logger.info(event.query.sql);
      logger.info(event.query.parameters);
      logger.info(event.queryDurationMillis);
    },
  });
};

export const closeDB = async () => {
  if (db) {
    await db.destroy();
  }
};
