import type { ORMTable } from "./dialect/types";
import type { DatabaseDriver } from "./driver/base_driver";
import { PostgresDriver } from "./driver/postgres";
import { InsertQuery } from "./query/insert_query";
import { SelectQuery } from "./query/select_query";
import { UpdateQuery } from "./query/update_query";
import type { Column, ORMColumn } from "./schema/column";

class Database {
  constructor(private driver: DatabaseDriver) { }

  select(...args: ORMColumn[]) {
    return new SelectQuery(args, this.driver);
  }

  insert(table: ORMTable) {
    return new InsertQuery(table, this.driver);
  }

  update(table: ORMTable) {
    return new UpdateQuery(table, this.driver);
  }
}

export const db = new Database(new PostgresDriver(process.env.DATABASE_URL!));
