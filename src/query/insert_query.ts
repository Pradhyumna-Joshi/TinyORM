import type { InferTable, ORMTable, SQLResponse } from "../common/types";
import type { DatabaseDriver } from "../driver/base_driver";
import { BaseQuery } from "./base_query";

export class InsertQuery<T extends ORMTable> extends BaseQuery {
  private table: T;
  private valuesData: InferTable<T> | InferTable<T>[] | null = null;
  constructor(table: T, driver: DatabaseDriver) {
    super(driver);
    this.table = table;
  }

  values(values: InferTable<T> | InferTable<T>[]): this {
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
