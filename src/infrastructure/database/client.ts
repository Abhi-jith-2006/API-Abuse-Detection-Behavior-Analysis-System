import { Pool, PoolClient } from "pg";

export const db = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "abhiiths",
  password: process.env.DB_PASSWORD || "abhiiths",
  database: process.env.DB_NAME || "api_abuse",
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2_000,
});

export async function getDbClient(): Promise<PoolClient> {
  return db.connect();
}

