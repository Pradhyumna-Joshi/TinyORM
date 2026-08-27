import type { ORMColumn, ORMTable } from "./common/types";
import type { DatabaseDriver } from "./driver/base_driver";
import { PostgresDriver } from "./driver/postgres";
import { CreateTableQuery } from "./query/create_query";
import { DeleteQuery } from "./query/delete_query";
import { InsertQuery } from "./query/insert_query";
import { SelectQuery } from "./query/select_query";
import { UpdateQuery } from "./query/update_query";

class Database {
  constructor(private driver: DatabaseDriver) { }

  createTable(table: ORMTable) {
    return new CreateTableQuery(table, this.driver);
  }

  select(...args: ORMColumn[]) {
    return new SelectQuery(args, this.driver);
  }

  insert<T extends ORMTable>(table: T) {
    return new InsertQuery<T>(table, this.driver);
  }

  update<T extends ORMTable>(table: T) {
    return new UpdateQuery<T>(table, this.driver);
  }

  delete(table: ORMTable) {
    return new DeleteQuery(table, this.driver);
  }
}

export const db = new Database(new PostgresDriver(process.env.DATABASE_URL!));
