import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/data-sources.ts',
    '<rootDir>/src/type.d.ts',
    '<rootDir>/src/app.ts',
    '<rootDir>/src/index.ts',
    '<rootDir>/src/migrations/',
    '<rootDir>/src/plugins/swagger.plugin.ts',
    '<rootDir>/src/utils/logger.util.ts',
  ],
  moduleNameMapper: {
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/tests/jest.setup.ts'],
};

export default config;
