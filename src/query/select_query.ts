import type { ORMColumn, ORMTable, SQLResponse } from "../common/types";
import type { DatabaseDriver } from "../driver/base_driver";
import type { Expression } from "../expressions/base_exp";
import { BaseQuery } from "./base_query";

export type SQLContext = {
  paramIndex: number;
};

export class SelectQuery extends BaseQuery {
  private table: ORMTable | null = null;
  private whereClause: Expression | null = null;
  private columns: ORMColumn[] = [];
  private limitValue: number | null = null;

  constructor(args: ORMColumn[], driver: DatabaseDriver) {
    super(driver);
    this.columns = args;
  }

  from(table: ORMTable): this {
    this.table = table;
    return this;
  }

  where(expression: Expression): this {
    this.whereClause = expression;
    return this;
  }

  limit(value: number): this {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("limit should be a positive integer");
    }
    this.limitValue = value;
    return this;
  }

  override flatten(): SQLResponse {
    if (!this.table) {
      throw new Error("SELECT query requires a table");
    }

    let sql = `SELECT `;
    let params: unknown[] = [];
    const ctx: SQLContext = {
      paramIndex: 1,
    };

    if (this.columns.length > 0) {
      sql += this.columns.map((col) => `"${col.name}"`).join(", ");
    } else {
      sql += "*";
    }

    sql += ` FROM "${this.table.tableName}"`;

    if (this.whereClause) {
      const result = this.whereClause.flatten(ctx);
      sql += ` WHERE ${result.sql}`;
      params.push(...result.params);
    }

    if (this.limitValue !== null) {
      sql += ` LIMIT ${this.limitValue}`;
    }

    return {
      sql,
      params,
    };
  }
}
