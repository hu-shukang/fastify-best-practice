import type { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

export default async () => {
  console.log('\nteardown...');

  const container: StartedPostgreSqlContainer = (global as any).__TESTCONTAINER__;
  if (container) {
    await container.stop();
    console.log('Container stopped.');
  }
};
