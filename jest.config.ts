import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/$1',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
};

export default config;
