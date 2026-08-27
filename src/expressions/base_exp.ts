import type { SQLResponse } from "../dialect/types";
import type { SQLContext } from "../query/select_query";

export abstract class Expression {
  abstract flatten(ctx: SQLContext): SQLResponse;
}
