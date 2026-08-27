import type { ORMTable, SQLResponse } from "../common/types";
import type { DatabaseDriver } from "../driver/base_driver";
import { BaseQuery } from "./base_query";

export class CreateTableQuery extends BaseQuery {
  private table: ORMTable;
  constructor(table: ORMTable, driver: DatabaseDriver) {
    super(driver);
    this.table = table;
  }
  override flatten(): SQLResponse {
    const columns = Object.values(this.table.columns);
    const sql =
      `CREATE TABLE "${this.table.tableName}" (${columns.map((col) => col.flatten()).join(", ")})`
        .replace(/\s+/g, " ")
        .trim();

    return {
      sql,
      params: [],
    };
  }
}
