import type { Columns } from "../schema/table";

export type ORMTable = {
  tableName: string;
  columns: Columns;
};

export interface SQLResponse {
  sql: string;
  params: unknown[];
}
