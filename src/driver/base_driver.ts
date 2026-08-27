import type { BaseQuery } from "../query/base_query";

export interface DatabaseDriver {
  execute(query: BaseQuery): Promise<unknown>;
}
