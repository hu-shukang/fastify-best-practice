import {
  KyselyPlugin,
  PluginTransformQueryArgs,
  PluginTransformResultArgs,
  QueryResult,
  RootOperationNode,
  UnknownRow,
} from 'kysely';

/**
 * Kysely Plugin that automatically converts all Date objects to ISO 8601 strings
 * in query results. This ensures consistency in API responses where JSON doesn't
 * natively support Date types.
 */
export class DateToStringPlugin implements KyselyPlugin {
  transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
    return args.node;
  }

  async transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>> {
    return {
      ...args.result,
      rows: args.result.rows.map((row) => this.convertDatesToStrings(row)),
    };
  }

  /**
   * Recursively converts all Date objects in an object to ISO 8601 strings
   */
  private convertDatesToStrings(obj: UnknownRow): UnknownRow {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (obj instanceof Date) {
      return obj.toISOString() as unknown as UnknownRow;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertDatesToStrings(item)) as unknown as UnknownRow;
    }

    if (typeof obj === 'object') {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.convertDatesToStrings(value as UnknownRow);
      }
      return result as UnknownRow;
    }

    return obj;
  }
}
