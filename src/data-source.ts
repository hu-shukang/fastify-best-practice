/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserEntity } from './entities/user.entity';
import { logger } from './utils/logger.util';
import 'reflect-metadata';
import { DataSource, QueryRunner, Logger } from 'typeorm';

class CustomLogger implements Logger {
  logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    logger.info(`[Query]: ${query}`);
    if (parameters) {
      logger.info(`[Parameters]: ${parameters}`);
    }
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    logger.error(`[Query]: ${query}`);
    if (parameters) {
      logger.error(`[Parameters]: ${parameters}`);
    }
    logger.error(`error: ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    logger.warn(`[Query]: ${query}`);
    if (parameters) {
      logger.warn(`[Parameters]: ${parameters}`);
    }
    logger.warn(`[Time]: ${time}`);
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
    logger.info(`message: ${message}`);
  }

  logMigration(message: string, _queryRunner?: QueryRunner) {
    logger.info(`message: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, _queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        logger.info(`message: ${message}`);
        break;
      case 'info':
        logger.info(`message: ${message}`);
        break;
      case 'warn':
        logger.warn(`message: ${message}`);
        break;
    }
  }
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity],
  migrations: ['src/migrations/*.{ts,js}'],
  synchronize: false,
  logger: new CustomLogger(),
});
