import type { SQLResponse } from "../common/types";
import type { SQLContext } from "../query/select_query";

export abstract class Expression {
  abstract flatten(ctx: SQLContext): SQLResponse;
}
