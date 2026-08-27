import { SQL } from "bun";
import { Column, integer, text } from "./schema/column";
import { pgTable } from "./schema/table";
import { db } from "./database";
import type { SQLContext } from "./query/select_query";
import { eq, gt, lt, ne } from "./expressions/comparison_exp";
import { or } from "./expressions/binary_exp";
import type { QueryArrayResult, QueryResult } from "pg";
import type { InferTable } from "./common/types";

const users = pgTable("users", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  age: integer("age"),
});

/*
const result: QueryResult<QueryArrayResult> = await db
  .select(users.id, users.name)
  .from(users)
  .where(or(gt(users.age, 25), ne(users.name, "Bob")))
  .limit(10)
  .execute();

console.log(result.rows);
*/

try {
  const query = await db
    .insert(users)
    .values({
      id: 1,
      name: "Alice",
      age: 25,
    })
    .execute();

  console.log(query);
} catch (error) {
  console.log(error);
}
