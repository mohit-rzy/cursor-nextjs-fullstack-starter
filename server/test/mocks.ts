import { jest } from '@jest/globals';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { gifts } from '../modules/gifts/gifts.db';

const schema = { gifts } as const;

// Create a factory function for the mock database
export function createMockDb() {
  // Create a mock pool
  const mockPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'testdb',
    user: 'test',
    password: 'test',
    max: 1,
  });

  // Create a mock drizzle instance
  const mockDb = drizzle(mockPool, { schema });

  return { mockDb, mockPool };
}

// Create initial mock db instance
const { mockDb: initialMockDb, mockPool: initialMockPool } = createMockDb();

// Mock the db module
jest.mock('../core/db', () => ({
  db: initialMockDb,
  pool: initialMockPool,
  schema,
}));

// Function to update the mock db instance
export function updateMockDb(newDb: ReturnType<typeof drizzle>) {
  const mock = jest.requireMock('../core/db') as {
    db: ReturnType<typeof drizzle>;
  };
  mock.db = newDb;
}
