const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // matches your jsconfig.json
  },
  testEnvironment: 'jest-environment-jsdom',

  // Polyfills that must run BEFORE Next.js code
  setupFiles: ['<rootDir>/jest.polyfills.js'],

  // Matchers and helpers (runs after env is set)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(customJestConfig);
