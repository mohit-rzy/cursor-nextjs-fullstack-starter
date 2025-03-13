import { beforeAll, afterAll } from '@jest/globals';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { createMockDb, updateMockDb } from './mocks';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from '../core/db';

let container: StartedPostgreSqlContainer | undefined;
let mockPool: Pool | undefined;
let mockDb: ReturnType<typeof drizzle> | undefined;

export async function setupTestDatabase() {
  try {
    // Start PostgreSQL container
    container = await new PostgreSqlContainer()
      .withDatabase('testdb')
      .withUsername('test')
      .withPassword('test')
      .withExposedPorts(5432)
      .start();

    // Create mock database with container details
    const { mockPool: pool } = createMockDb();
    mockPool = pool;

    // Update mock pool configuration with container details
    mockPool.options.host = container.getHost();
    mockPool.options.port = container.getMappedPort(5432);
    mockPool.options.database = container.getDatabase();
    mockPool.options.user = container.getUsername();
    mockPool.options.password = container.getPassword();

    // Create drizzle instance with schema
    mockDb = drizzle(mockPool, { schema });

    // Update the mock to use our new drizzle instance
    updateMockDb(mockDb);

    // Run migrations
    await migrate(mockDb, { migrationsFolder: 'drizzle' });

    return mockDb;
  } catch (error) {
    console.error('Failed to setup test database:', error);
    await teardownTestDatabase();
    throw error;
  }
}

export async function teardownTestDatabase() {
  try {
    // Close all connections in the pool
    if (mockPool) {
      await mockPool.end();
      mockPool = undefined;
    }

    // Stop the container
    if (container) {
      await container.stop();
      container = undefined;
    }
  } catch (error) {
    console.error('Failed to teardown test database:', error);
    throw error;
  }
}

// Global setup and teardown
beforeAll(async () => {
  await setupTestDatabase();
}, 30000); // Increase timeout to 30 seconds

afterAll(async () => {
  await teardownTestDatabase();
}, 30000); // Increase timeout to 30 seconds
