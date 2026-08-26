import { SQL } from "bun";

const sql = new SQL(process.env.DATABASE_URL!);

const data = await sql`SELECT * FROM USERS`;
console.log(data);
