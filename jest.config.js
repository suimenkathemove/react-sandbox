module.exports = {
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
};
