import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { gifts } from '@/server/modules/gifts/gifts.db';

export const schema = { gifts } as const;
// Load environment variables
dotenv.config();

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV! === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

// Create Drizzle ORM instance with prepared queries
export const db = drizzle(pool, { schema });

// Export pool for use in migrations and tests
export { pool };
