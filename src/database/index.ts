import { CamelCasePlugin, Kysely, ParseJSONResultsPlugin, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { logger } from '@/utils/logger.util';

import { DateToStringPlugin } from './plugins/date-to-string.plugin';
import { Database } from './types';

export type DBConfig = {
  DB_NAME: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
};

export const createDB = (config: DBConfig) => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database: config.DB_NAME,
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      port: config.DB_PORT,
      max: 10,
    }),
  });

  const db = new Kysely<Database>({
    dialect,
    log(event): void {
      logger.info(event.query.sql.split('\n').join(' ').replace(/\s+/g, ' '));
      logger.info(event.query.parameters);
      logger.info(event.queryDurationMillis.toFixed(0) + 'ms');
    },
    plugins: [new CamelCasePlugin(), new ParseJSONResultsPlugin(), new DateToStringPlugin()],
  });
  return db;
};

export const closeDB = async (db: Kysely<Database>) => {
  if (db) {
    await db.destroy();
  }
};
