import { SQL } from "bun";
import { Column, integer, text } from "./schema/column";
import { pgTable } from "./schema/table";
import { generateCreateTable } from "./dialect/postgres";
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
console.log(resp);
