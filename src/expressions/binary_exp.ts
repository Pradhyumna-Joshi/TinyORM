import type { SQLResponse } from "../dialect/types";
import type { SQLContext } from "../query/select_query";
import { Expression } from "./base_exp";

abstract class BinaryExpression extends Expression {
  constructor(
    protected left: Expression,
    protected right: Expression,
  ) {
    super();
  }
}

class And extends BinaryExpression {
  constructor(left: Expression, right: Expression) {
    super(left, right);
  }

  override flatten(ctx: SQLContext): SQLResponse {
    const left = this.left.flatten(ctx);
    const right = this.right.flatten(ctx);

    return {
      sql: `(${left.sql} AND ${right.sql})`,
      params: [...left.params, ...right.params],
    };
  }
}

class Or extends BinaryExpression {
  constructor(left: Expression, right: Expression) {
    super(left, right);
  }

  override flatten(ctx: SQLContext): SQLResponse {
    const left = this.left.flatten(ctx);
    const right = this.right.flatten(ctx);

    return {
      sql: `(${left.sql} OR ${right.sql})`,
      params: [...left.params, ...right.params],
    };
  }
}

export function and(left: Expression, right: Expression) {
  return new And(left, right);
}

export function or(left: Expression, right: Expression) {
  return new Or(left, right);
}
