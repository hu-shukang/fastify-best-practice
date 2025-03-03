import { Book } from './entity/book.entity';
import { User } from './entity/user.entity';
import { logger } from './util/logger.util';
import 'reflect-metadata';
import { DataSource, Logger, QueryRunner } from 'typeorm';

class CustomLogger implements Logger {
  logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    logger.info(`query: ${query}`);
    if (parameters) {
      logger.info(`parameters: ${parameters}`);
    }
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    logger.error(`query: ${query}`);
    if (parameters) {
      logger.error(`parameters: ${parameters}`);
    }
    logger.error(`error: ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    logger.warn(`query: ${query}`);
    if (parameters) {
      logger.warn(`parameters: ${parameters}`);
    }
    logger.warn(`time: ${time}`);
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
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logger: new CustomLogger(),
  entities: [Book, User],
  migrations: ['src/migration/**/*.ts'],
  subscribers: [],
});
