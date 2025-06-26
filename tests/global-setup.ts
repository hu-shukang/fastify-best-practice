import 'tsconfig-paths/register';

import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

export default async () => {
  dotenv.config({ path: path.resolve(__dirname, '../env/.env') });

  const container = await new PostgreSqlContainer('postgres:15-alpine')
    .withDatabase(process.env.DB_NAME || 'test_db')
    .withUsername(process.env.DB_USER || 'test_user')
    .withPassword(process.env.DB_PASSWORD || 'test_password')
    .start();
  console.log('PostgreSQL container started.');

  Object.assign(process.env, {
    DB_HOST: container.getHost(),
    DB_USER: container.getUsername(),
    DB_PASSWORD: container.getPassword(),
    DB_PORT: container.getPort().toString(),
    DB_NAME: container.getDatabase(),
  });

  const kyselyPath = './node_modules/.bin/kysely';
  execSync(`${kyselyPath} migrate:latest && ${kyselyPath} seed:run`);

  (global as any).__TESTCONTAINER__ = container;
};
