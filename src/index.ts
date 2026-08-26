import { SQL } from "bun";
import { Column, integer, text } from "./schema/column";
import { pgTable } from "./schema/table";
import { generateCreateTable } from "./dialect/postgres";
import { eq, Expression } from "./query/expression";
import { db } from "./database";
/*
const sql = new SQL(process.env.DATABASE_URL!);

const data = await sql`SELECT * FROM USERS`;
console.log(data);
*/

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

const exp = eq(users.age, 123);
console.log(exp.flatten(1).sql);

const query = db.select().from(users).where(eq(users.age, 25)).flatten();
console.log(query);
