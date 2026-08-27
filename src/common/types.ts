import type { Column } from "../schema/column";
import type { Columns } from "../schema/table";

export type ORMTable = {
  tableName: string;
  columns: Columns;
};

export type ORMColumn = Column<number> | Column<string>;

export interface SQLResponse {
  sql: string;
  params: unknown[];
}

export type InferColumn<T> = T extends Column<infer U> ? U : never;

export type InferTable<T extends ORMTable> = {
  [K in keyof T["columns"]]: InferColumn<T["columns"][K]>;
};
