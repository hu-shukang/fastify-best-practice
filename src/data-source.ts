import { UserEntity } from './entities/user.entity';
import { logger } from './utils/logger.util';
import 'reflect-metadata';
import { DataSource, AbstractLogger, LogLevel, LogMessage, QueryRunner } from 'typeorm';

export class CustomLogger extends AbstractLogger {
  /**
   * Write log to specific output.
   */
  protected writeLog(level: LogLevel, logMessage: LogMessage | LogMessage[], queryRunner?: QueryRunner) {
    const messages = this.prepareLogMessages(
      logMessage,
      {
        highlightSql: false,
      },
      queryRunner,
    );

    for (const message of messages) {
      switch (message.type ?? level) {
        case 'log':
        case 'schema-build':
        case 'migration':
          logger.info(message.message);
          break;

        case 'info':
        case 'query':
          if (message.prefix) {
            logger.info(message.prefix, message.message);
          } else {
            logger.info(message.message);
          }
          break;

        case 'warn':
        case 'query-slow':
          if (message.prefix) {
            logger.warn(message.prefix, message.message);
          } else {
            logger.warn(message.message);
          }
          break;

        case 'error':
        case 'query-error':
          if (message.prefix) {
            logger.error(message.prefix, message.message);
          } else {
            logger.error(message.message);
          }
          break;
      }
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
  synchronize: process.env.NODE_ENV === 'dev',
  logger: new CustomLogger(),
});
