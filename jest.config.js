module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest' // For ESM support
  },
  transformIgnorePatterns: [
    '/node_modules/(?!uuid)' // Include `uuid` for transformation
  ],
  moduleNameMapper: {
    '^uuid$': require.resolve('uuid') // Improved way to resolve UUID path
  },
  testEnvironment: "jsdom",
};
