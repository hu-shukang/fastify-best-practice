import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
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
      logger.info(event.query.sql.split('\n').join(' ').replace(/\s+/g, ' '));
      logger.info(event.query.parameters);
      logger.info(event.queryDurationMillis.toFixed(0) + 'ms');
    },
    plugins: [new CamelCasePlugin()],
  });
};

export const closeDB = async () => {
  if (db) {
    await db.destroy();
  }
};
