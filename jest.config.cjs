module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.ts'
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.css$': 'jest-transform-css',
    },
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
};