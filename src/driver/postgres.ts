import { Pool } from "pg";
import type { BaseQuery } from "../query/base_query";
import type { DatabaseDriver } from "./base_driver";

export class PostgresDriver implements DatabaseDriver {
  private pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({
      connectionString,
    });
  }

  async execute(query: BaseQuery): Promise<unknown> {
    const { sql, params } = query.flatten();
    return this.pool.query(sql, params);
  }
}
