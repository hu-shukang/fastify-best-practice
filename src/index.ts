import fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import path from 'path';
import dotenv from 'dotenv';

const server = fastify();

if (process.env.NODE_ENV === 'local') {
  dotenv.config();
}

server.register(autoLoad, {
  dir: path.join(__dirname, 'plugin'),
  matchFilter: (path) => path.endsWith('global.plugin.ts'),
});

server.register(autoLoad, {
  dir: path.join(__dirname, 'controller'),
  matchFilter: (path) => path.endsWith('index.ts'),
  dirNameRoutePrefix: false,
});

server.listen({ host: '0.0.0.0', port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log(server.printRoutes());
});
