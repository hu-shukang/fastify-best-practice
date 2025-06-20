import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      NODE_ENV: 'test' | 'dev' | 'it' | 'prod';
      PORT: number;
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT: number;
      LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
      CORS: 'ON' | 'OFF';
      SWAGGER: 'ON' | 'OFF';
    };
  }
}
