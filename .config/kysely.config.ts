import { CamelCasePlugin, PostgresDialect } from 'kysely';
import { defineConfig } from 'kysely-ctl';
import { Pool } from 'pg';

import { DateToStringPlugin } from '@/database/plugins/date-to-string.plugin';

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      max: 10,
    }),
  }),
  migrations: {
    migrationFolder: '.config/migrations',
  },
  seeds: {
    seedFolder: '.config/seeds',
  },
  plugins: [new CamelCasePlugin(), new DateToStringPlugin()],
});
