import { SelectQuery } from "./query/query";

class Database {
  select() {
    return new SelectQuery();
  }
}

export const db = new Database();
