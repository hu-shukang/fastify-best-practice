import { FastifyInstance } from 'fastify';
import { CamelCasePlugin, Kysely, ParseJSONResultsPlugin, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { logger } from '@/utils/logger.util';

import { Database } from './types';

export let db: Kysely<Database>;

export const createDB = (fastify: FastifyInstance) => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database: fastify.config.DB_NAME,
      host: fastify.config.DB_HOST,
      user: fastify.config.DB_USER,
      password: fastify.config.DB_PASSWORD,
      port: fastify.config.DB_PORT,
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
