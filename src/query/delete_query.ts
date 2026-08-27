import type { ORMTable, SQLResponse } from "../common/types";
import type { DatabaseDriver } from "../driver/base_driver";
import type { Expression } from "../expressions/base_exp";
import { BaseQuery } from "./base_query";
import type { SQLContext } from "./select_query";

export class DeleteQuery extends BaseQuery {
  private table: ORMTable;
  private whereClause: Expression | null = null;
  constructor(table: ORMTable, driver: DatabaseDriver) {
    super(driver);
    this.table = table;
  }

  where(expression: Expression): this {
    this.whereClause = expression;
    return this;
  }

  override flatten(): SQLResponse {
    if (!this.whereClause) {
      throw new Error("DELETE requires a where clause");
    }

    const ctx: SQLContext = {
      paramIndex: 1,
    };

    const result = this.whereClause.flatten(ctx);

    const sql = `
    DELETE FROM "${this.table.tableName}"
    WHERE ${result.sql}
    `.trim();

    const params = result.params;

    return {
      sql,
      params,
    };
  }
}
