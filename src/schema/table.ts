import type { ORMColumn } from "../common/types";

export type Columns = Record<string, ORMColumn>;

export class PgTable<T extends Columns> {
  constructor(
    public tableName: string,
    public columns: T,
  ) { }
}

export function pgTable<T extends Columns>(
  name: string,
  columns: T,
): PgTable<T> & T {
  const table = new PgTable(name, columns);
  return {
    ...table,
    ...columns,
  };
}
