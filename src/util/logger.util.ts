import { requestContext } from '@fastify/request-context';

const getLogger = () => requestContext.get('logger') ?? console;

export const logger = {
  info: (msg: string) => getLogger().info(msg),
  error: (msg: string) => getLogger().error(msg),
  warn: (msg: string) => getLogger().warn(msg),
  debug: (msg: string) => getLogger().debug(msg),
};
