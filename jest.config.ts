import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

const config: Config = {
  // [...]
  ...createDefaultPreset(),
  watchman: false,
  moduleNameMapper: {
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/**/*.test.ts'],
  globalSetup: '<rootDir>/tests/global-setup.ts',
  globalTeardown: '<rootDir>/tests/global-teardown.ts',
};

export default config;
