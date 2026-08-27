import type { ORMTable, SQLResponse } from "../dialect/types";
import type { DatabaseDriver } from "../driver/base_driver";
import { BaseQuery } from "./base_query";

export class InsertQuery extends BaseQuery {
  private table: ORMTable;
  private valuesData:
    Record<string, unknown> | Record<string, unknown>[] | null = null;
  constructor(table: ORMTable, driver: DatabaseDriver) {
    super(driver);
    this.table = table;
  }

  values(values: Record<string, unknown> | Record<string, unknown>[]): this {
    this.valuesData = values;
    return this;
  }

  override flatten(): SQLResponse {
    if (!this.valuesData) {
      throw new Error("INSERT query requires values");
    }

    const rows = Array.isArray(this.valuesData)
      ? this.valuesData
      : [this.valuesData];

    if (rows.length === 0) {
      throw new Error("INSERT requires at least one row");
    }

    const columns = Object.keys(rows[0]!);
    const params: unknown[] = [];

    let index = 1;

    const group = rows.map((row) => {
      const placeholders = Object.values(row).map((value) => {
        params.push(value);
        return `$${index++}`;
      });

      return `(${placeholders.join(", ")})`;
    });

    const sql = `
    INSERT INTO "${this.table.tableName}"
        (${columns.map((col) => `"${col}"`).join(", ")})
      VALUES ${group.join(", ")}
        `
      .replace(/\s+/g, " ")
      .trim();

    return {
      sql,
      params,
    };
  }
}
