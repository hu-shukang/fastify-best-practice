import { Kysely } from 'kysely';

import { Database } from '@/database/types';

/**
 * 异常捕获模式的返回结果类型
 */
export type ActionsResult<T> = {
  result?: T;
  error?: Error;
};

/**
 * 任务项定义
 */
interface ActionTask {
  fn: (db?: Kysely<Database>) => void | Promise<void> | unknown;
  type: 'execute' | 'executeWithReturn';
  needsDb: boolean;
}

/**
 * Actions 链式调用框架
 * 支持函数链式执行、事务管理、异常处理
 * @template R 最后一个 executeWithReturn 的返回类型 (默认 void 表示无返回值)
 * @template T 是否启用异常捕获模式 (true: withoutThrow, false: throwErrors)
 */
class Actions<R = void, T extends boolean = false> {
  private tasks: ActionTask[] = [];
  private db: Kysely<Database> | null = null;
  private throwErrors: boolean = true;
  private useTransaction: boolean = false;

  /**
   * 执行操作（返回值会被忽略）
   * @param fn 要执行的函数，可以是 (db) => U 或 () => U 的形式，返回值会被丢弃
   */
  public execute(fn: ((db: Kysely<Database>) => unknown) | (() => unknown)): Actions<R, T> {
    this.tasks.push({
      fn: fn as (db?: Kysely<Database>) => void | Promise<void> | unknown,
      type: 'execute',
      needsDb: fn.length > 0,
    });
    return this;
  }

  /**
   * 执行返回值的操作
   * @param fn 要执行的函数，返回值可被后续使用
   */
  public executeWithReturn<U>(fn: ((db: Kysely<Database>) => U | Promise<U>) | (() => U | Promise<U>)): Actions<U, T> {
    this.tasks.push({
      fn: fn as (db?: Kysely<Database>) => void | Promise<void> | unknown,
      type: 'executeWithReturn',
      needsDb: fn.length > 0,
    });
    return this as unknown as Actions<U, T>;
  }

  /**
   * 注入数据库实例
   * @param db Kysely 数据库实例
   */
  public use(db: Kysely<Database>): Actions<R, T> {
    this.db = db;
    return this;
  }

  /**
   * 启用异常捕获模式
   * 启用后，invoke() 返回 { result?, error? } 而不是直接抛出异常
   */
  public withoutThrow(): Actions<R, true> {
    this.throwErrors = false;
    return this as unknown as Actions<R, true>;
  }

  /**
   * 启用事务模式
   * 所有操作将在事务中执行，失败时自动回滚
   * @param db Kysely 数据库实例
   */
  public transaction(db: Kysely<Database>): Actions<R, T> {
    this.db = db;
    this.useTransaction = true;
    return this;
  }

  /**
   * 执行整个链
   * @returns 如果启用 withoutThrow，返回 ActionsResult<R>；否则返回 R
   */
  public async invoke(): Promise<T extends true ? ActionsResult<R> : R> {
    try {
      if (!this.db) {
        throw new Error('Database instance is required. Use .use(db) or .transaction(db)');
      }

      let result: unknown;
      if (this.useTransaction) {
        result = await this.executeWithTransaction();
      } else {
        result = await this.executeSequentially();
      }
      return result as T extends true ? ActionsResult<R> : R;
    } catch (error) {
      if (this.throwErrors) {
        throw error;
      }
      return {
        result: undefined,
        error: error instanceof Error ? error : new Error(String(error)),
      } as T extends true ? ActionsResult<R> : R;
    }
  }

  /**
   * 顺序执行任务（无事务）
   */
  private async executeSequentially(): Promise<R | undefined> {
    let result: unknown = undefined;

    for (const task of this.tasks) {
      const fnArg = task.needsDb ? (this.db as Kysely<Database>) : undefined;
      if (task.type === 'execute') {
        await Promise.resolve(task.fn(fnArg));
      } else if (task.type === 'executeWithReturn') {
        result = await Promise.resolve(task.fn(fnArg));
      }
    }

    return result as R | undefined;
  }

  /**
   * 在事务中执行任务
   */
  private async executeWithTransaction(): Promise<R | undefined> {
    if (!this.db) {
      throw new Error('Database instance is required');
    }

    return await this.db.transaction().execute(async (trx) => {
      let result: unknown = undefined;

      for (const task of this.tasks) {
        const fnArg = task.needsDb ? trx : undefined;
        if (task.type === 'execute') {
          await Promise.resolve(task.fn(fnArg));
        } else if (task.type === 'executeWithReturn') {
          result = await Promise.resolve(task.fn(fnArg));
        }
      }

      return result as R;
    });
  }
}

/**
 * 工厂函数，用于创建新的 Actions 实例
 */
const ActionsFactory = (): Actions<void> => {
  return new Actions();
};

export { ActionsFactory as Actions };
