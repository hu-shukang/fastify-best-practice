import 'tsconfig-paths/register';

import { PostgreSqlContainer } from '@testcontainers/postgresql';
import dotenv from 'dotenv';
import { FastifyInstance } from 'fastify';
import path from 'path';

export let app: FastifyInstance;

export default async () => {
  dotenv.config({ path: path.resolve(__dirname, '../env/.env') });

  // const container = await new PostgreSqlContainer('postgres:15-alpine')
  //   .withDatabase(process.env.DB_NAME || 'test_db')
  //   .withUsername(process.env.DB_USER || 'test_user')
  //   .withPassword(process.env.DB_PASSWORD || 'test_password')
  //   .withExposedPorts(5432)
  //   .start();
  // console.log('PostgreSQL container started.');
  // process.env.DB_HOST = container.getHost();
  // process.env.DB_USER = container.getUsername();
  // process.env.DB_PASSWORD = container.getPassword();

  // console.log('init database seed');
  // // await seed();

  // (global as any).__TESTCONTAINER__ = container;
};
