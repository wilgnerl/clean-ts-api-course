module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!**/test/**',
    '!<rootDir>/src/@types/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: '',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  preset: '@shelf/jest-mongodb',
};
