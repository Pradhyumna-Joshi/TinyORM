import { BaseQuery } from "./base_query";
import type { ORMTable, SQLResponse } from "../dialect/types";
import type { DatabaseDriver } from "../driver/base_driver";
import type { Expression } from "../expressions/base_exp";
import type { SQLContext } from "./select_query";

export class UpdateQuery extends BaseQuery {
  private table: ORMTable;
  private valuesData: Record<string, unknown> | null = null;
  private whereClause: Expression | null = null;

  constructor(table: ORMTable, driver: DatabaseDriver) {
    super(driver);
    this.table = table;
  }

  set(values: Record<string, unknown>): this {
    this.valuesData = values;
    return this;
  }

  where(expression: Expression): this {
    this.whereClause = expression;
    return this;
  }

  override flatten(): SQLResponse {
    if (!this.valuesData) {
      throw new Error("UPDATE requires values");
    }

    if (!this.whereClause) {
      throw new Error("UPDATE requires a where clause");
    }

    const ctx: SQLContext = {
      paramIndex: 1,
    };

    const group = Object.keys(this.valuesData).map((key) => {
      return `"${key}" = $${ctx.paramIndex++}`;
    });

    const result = this.whereClause.flatten(ctx);

    const sql = `
    UPDATE "${this.table.tableName}"
    SET ${group.join(", ")}
    WHERE ${result.sql}
    `.replace(/\s+/g, " ");

    const params = [...Object.values(this.valuesData), ...result.params];

    return {
      sql,
      params,
    };
  }
}
