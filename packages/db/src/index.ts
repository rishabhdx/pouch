import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";

import * as schema from "./schema.js";

dotenv.config({
  path: "../../.env"
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!
});

export const db = drizzle({ client: pool, schema });
