import type { DatabaseDriver } from "./driver/base_driver";
import { PostgresDriver } from "./driver/postgres";
import { SelectQuery } from "./query/select_query";
import type { Column, ORMColumn } from "./schema/column";

class Database {
  constructor(private driver: DatabaseDriver) { }
  select(...args: ORMColumn[]) {
    return new SelectQuery(args, this.driver);
  }
}

export const db = new Database(new PostgresDriver(process.env.DATABASE_URL!));
