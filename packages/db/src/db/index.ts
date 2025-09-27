import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";

import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const db = drizzle(pool, { schema });

// {
//   "name": "@pouch/db",
//   "type": "module",
//   "version": "0.1.0",
//   "scripts": {
//     "build": "tsc",
//     "dev": "tsc --watch"
//   },
//   "exports": {
//     ".": "./dist/db/index.js",
//     "./schema": "./dist/db/schema.js"
//   },
//   "dependencies": {
//     "dotenv": "^17.2.2",
//     "drizzle-orm": "^0.44.5",
//     "pg": "^8.16.3"
//   },
//   "devDependencies": {
//     "@types/pg": "^8.15.5",
//     "drizzle-kit": "^0.31.4",
//     "tsx": "^4.20.5",
//     "typescript": "latest"
//   }
// }
