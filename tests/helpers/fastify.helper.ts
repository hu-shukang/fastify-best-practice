import { FastifyInstance } from 'fastify';

import { build } from '@/app';

/**
 * describe ブロック内で使用されるヘルパー関数です。
 * Fastify インスタンスの作成と破棄を自動的に処理します。
 * @returns テストケースで app インスタンスを取得するための getApp 関数を返します。
 */
export function setupFastify() {
  // クロージャーで渡すために、app インスタンスをオブジェクトに保持します
  const appContainer: { instance: FastifyInstance | null } = { instance: null };

  // 各 describe ブロックに独立したライフサイクルフックを設定します
  beforeAll(async () => {
    appContainer.instance = build();
    await appContainer.instance.ready();
  });

  afterAll(async () => {
    await appContainer.instance?.close();
  });

  // it/test ブロックが初期化済みの app インスタンスを安全に取得できるように、関数を返します
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
