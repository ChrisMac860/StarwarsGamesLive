module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    moduleFileExtensions: ['js', 'json'],
    testMatch: [
        '<rootDir>/tests/**/*.test.js'
    ],
    verbose: true
};
