module.exports = {
    testEnvironment: "jsdom",
    preset: 'ts-jest',
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.ts'
    ],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
        "\\.scss$": "identity-obj-proxy",
        "\\.png$": "<rootDir>/src/__mocks__/fileMock.js",
    },
};