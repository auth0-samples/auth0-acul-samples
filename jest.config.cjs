module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // We need this wildcard mapper to help Jest resolve the non-standard
    // sub-path exports of the Auth0 ACUL JS SDK before it can apply our manual mock.
    '^@auth0/auth0-acul-js/(.*)$': '<rootDir>/node_modules/@auth0/auth0-acul-js/dist/$1/index.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Allow transforming ESM modules from node_modules.
  transformIgnorePatterns: ['/node_modules/(?!@auth0/auth0-acul-js/)'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
}; 