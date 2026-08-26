import type { ORMTable, SQLResponse } from "../dialect/types";
import type { Expression } from "./expression";

abstract class Query {
  abstract flatten(): SQLResponse;
}

export class SelectQuery extends Query {
  private table: ORMTable | null = null;
  private whereClause: Expression<unknown> | null = null;

  from(table: ORMTable): this {
    this.table = table;
    return this;
  }

  where<T>(expression: Expression<T>): this {
    this.whereClause = expression;
    return this;
  }

  override flatten(): SQLResponse {
    if (!this.table) {
      throw new Error("SELECT query requires a table");
    }

    let sql = `SELECT * FROM "${this.table.tableName}"`;
    let params: unknown[] = [];

    if (this.whereClause) {
      const result = this.whereClause.flatten(1);
      sql += ` WHERE ${result.sql}`;
      params.push(...result.params);
    }

    return {
      sql,
      params,
    };
  }
}
