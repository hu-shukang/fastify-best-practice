import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const ignorePaths = ['/documentation', '/health'];

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

    // レスポンス情報のログ出力
    request.log.info(
      `Response info: ${JSON.stringify({
        statusCode: reply.statusCode,
        url: request.url,
        method: request.method,
        headers: reply.getHeaders(),
        payload: payload,
      })}`,
    );

    done();
  });
});

export default responseHookPlugin;
