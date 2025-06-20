import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { SCHEMA } from '@/utils/const.util';
import { logger } from '@/utils/logger.util';

const ignorePaths = [SCHEMA.swagger.routePrefix];

const checkIgnorePaths = (path: string) => {
  return ignorePaths.some((ignorePath) => path.startsWith(ignorePath));
};

const responseHookPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addHook('onSend', (request, reply, payload, done) => {
    if (checkIgnorePaths(request.url)) {
      return done();
    }
    // 共通ヘッダーの設定
    reply.header('Cache-Control', 'no-store, stale-if-error=0');
    reply.header('Pragma', 'no-cache');
    reply.header('X-Content-Type-Options', 'nosniff');
    reply.header('X-Frame-Options', 'DENY');
    reply.header('X-XSS-Protection', '1; mode=block');
    reply.header('content-type', 'application/json');
    reply.header('x-request-id', request.id);

    // レスポンス情報のログ出力
    logger.info(
      {
        statusCode: reply.statusCode,
        url: request.url,
        method: request.method,
        headers: reply.getHeaders(),
        payload: payload,
      },
      'Response info',
    );

    done();
  });
});

export default responseHookPlugin;
