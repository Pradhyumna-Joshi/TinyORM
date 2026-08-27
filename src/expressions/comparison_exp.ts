import type { SQLResponse } from "../common/types";
import type { SQLContext } from "../query/select_query";
import type { Column } from "../schema/column";
import { Expression } from "./base_exp";
// comparsion expression
abstract class BaseComparisonExpression<T> extends Expression {
  constructor(
    protected column: Column<T>,
    protected value: T,
    protected operator: string,
  ) {
    super();
  }

  flatten(ctx: SQLContext): SQLResponse {
    const idx = ctx.paramIndex++;
    return {
      sql: `"${this.column.name}" ${this.operator} $${idx}`,
      params: [this.value],
    };
  }
}

class Eq<T> extends BaseComparisonExpression<T> {
  constructor(column: Column<T>, value: T) {
    super(column, value, "=");
  }
}

class Gt<T> extends BaseComparisonExpression<T> {
  constructor(column: Column<T>, value: T) {
    super(column, value, ">");
  }
}

class Lt<T> extends BaseComparisonExpression<T> {
  constructor(column: Column<T>, value: T) {
    super(column, value, "<");
  }
}

class Gte<T> extends BaseComparisonExpression<T> {
  constructor(column: Column<T>, value: T) {
    super(column, value, ">=");
  }
}

class Lte<T> extends BaseComparisonExpression<T> {
  constructor(column: Column<T>, value: T) {
    super(column, value, "<=");
  }
}

class Ne<T> extends BaseComparisonExpression<T> {
  constructor(column: Column<T>, value: T) {
    super(column, value, "<>");
  }
}

function eq<T>(column: Column<T>, value: T) {
  return new Eq<T>(column, value);
}

function gt<T>(column: Column<T>, value: T) {
  return new Gt<T>(column, value);
}

function lt<T>(column: Column<T>, value: T) {
  return new Lt<T>(column, value);
}

function gte<T>(column: Column<T>, value: T) {
  return new Gte<T>(column, value);
}

function lte<T>(column: Column<T>, value: T) {
  return new Lte<T>(column, value);
}

function ne<T>(column: Column<T>, value: T) {
  return new Ne<T>(column, value);
}

export { eq, gt, lt, gte, lte, ne };
