import pg from "pg";
import bcryptjs from "bcryptjs";
import "dotenv/config";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

const res = await client.query(
  `SELECT username, password_hash FROM admin_users WHERE username = $1`,
  ["admin@navticni-tecaj.si"]
);

const user = res.rows[0];
console.log("User found:", !!user);
console.log("Hash:", user.password_hash);
console.log("Hash length:", user.password_hash.length);
console.log("Verify 'phenibut':", bcryptjs.compareSync("phenibut", user.password_hash));

await client.end();
