import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // 关键配置：确保 ts-jest 以非隔离模式运行
        // 这对于需要类型信息的装饰器和元数据至关重要
        isolatedModules: false,
        // 明确指定使用哪个 tsconfig 文件
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/data-source.ts',
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
  globalSetup: '<rootDir>/tests/global-setup.ts',
  globalTeardown: '<rootDir>/tests/global-teardown.ts',
};

export default config;
