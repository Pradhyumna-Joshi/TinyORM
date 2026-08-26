import type { SQLResponse } from "../dialect/types";
import type { Column, ORMColumn } from "../schema/column";

export abstract class Expression<T> {
  constructor(
    protected operator: string,
    protected column: Column<T>,
    protected value: T,
  ) { }

  flatten(index: number): SQLResponse {
    return {
      sql: `"${this.column.name}" ${this.operator} $${index}`,
      params: [this.value],
    };
  }
}

class Eq<T> extends Expression<T> {
  constructor(column: Column<T>, value: T) {
    super("=", column, value);
  }
}

export function eq<T>(column: Column<T>, value: T) {
  return new Eq<T>(column, value);
}
