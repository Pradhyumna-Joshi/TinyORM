import type { ORMTable, SQLResponse } from "./types";

export function generateCreateTable(table: ORMTable): SQLResponse {
  let sqlStr = "CREATE TABLE";

  // add table name
  sqlStr += ` "${table.tableName}" `;

  // add columns
  // add start
  sqlStr += " (";

  // add column metadata
  const colStr = Object.values(table.columns)
    .map((col) => col.flatten())
    .join(", ");

  sqlStr += colStr;

  // add end
  sqlStr += " )";

  return {
    sql: sqlStr,
    params: [],
  };
}
