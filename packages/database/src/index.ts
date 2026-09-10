import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// This is required to prevent multiple connections in dev mode during hot reloading (e.g. Next.js)
const globalForPostgres = globalThis as unknown as {
  postgresConnection: postgres.Sql | undefined;
};

const connectionString = process.env.DATABASE_URL || 'postgresql://codeforge:codeforge_password@localhost:5432/codeforge';

export const sql = globalForPostgres.postgresConnection ?? postgres(connectionString, { max: 10 });

if (process.env.NODE_ENV !== 'production') {
  globalForPostgres.postgresConnection = sql;
}

export const db = drizzle(sql, { schema });
export * from './schema';
