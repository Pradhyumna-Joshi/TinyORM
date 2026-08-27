import { SQL } from "bun";
import { Column, integer, text } from "./schema/column";
import { pgTable } from "./schema/table";
import { generateCreateTable } from "./dialect/postgres";
import { db } from "./database";
import type { SQLContext } from "./query/select_query";
import { eq, gt, lt, ne } from "./expressions/comparison_exp";
import { or } from "./expressions/binary_exp";
import type { QueryArrayResult, QueryResult } from "pg";

const users = pgTable("users", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  age: integer("age"),
  title: text("title").notNull(),
});

const id: Column<number> = users.id;
const name: Column<string> = users.name;
const age: Column<number> = users.age;
const title: Column<string> = users.title;

let resp = generateCreateTable(users);
//console.log(resp);

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
    .update(users)
    .set({
      name: "Bob",
      age: 31,
    })
    .where(eq(users.id, 2))
    .execute();
  console.log(query);
} catch (error) {
  console.log(error);
}
