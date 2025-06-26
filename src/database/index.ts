import { CamelCasePlugin, Kysely, ParseJSONResultsPlugin, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { logger } from '@/utils/logger.util';

import { Database } from './types';

export let db: Kysely<Database>;

export type ConnectionInfo = {
  DB_NAME: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
};

export const createDB = (connectionInfo: ConnectionInfo) => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database: connectionInfo.DB_NAME,
      host: connectionInfo.DB_HOST,
      user: connectionInfo.DB_USER,
      password: connectionInfo.DB_PASSWORD,
      port: connectionInfo.DB_PORT,
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
    plugins: [new CamelCasePlugin(), new ParseJSONResultsPlugin()],
  });
};

export const closeDB = async () => {
  if (db) {
    await db.destroy();
  }
};
