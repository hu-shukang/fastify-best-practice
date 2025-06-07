import { build } from '@/app';
import { FastifyInstance } from 'fastify';

/**
 * 一个在 describe 块内部使用的辅助函数。
 * 它会自动处理 Fastify 实例的创建和销毁。
 * @returns 返回一个 getApp 函数，用于在测试用例中获取 app 实例。
 */
export function setupFastify() {
  // 用一个对象来持有 app 实例，以便在闭包中传递
  const appContainer: { instance: FastifyInstance | null } = { instance: null };

  // 在每个 describe 块中设置独立的生命周期钩子
  beforeAll(async () => {
    appContainer.instance = build();
    await appContainer.instance.ready();
  });

  afterAll(async () => {
    await appContainer.instance?.close();
  });

  // 返回一个函数，让 it/test 块可以安全地获取已初始化的 app 实例
  return {
    getApp: (): FastifyInstance => {
      if (!appContainer.instance) {
        throw new Error(
          'Fastify app instance is not available. Make sure getApp() is called within a test case (it/test).',
        );
      }
      return appContainer.instance;
    },
  };
}
