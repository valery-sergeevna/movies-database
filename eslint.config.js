import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'],
        ignores: ['dist', 'node_modules'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser,
            parser: tsParser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': tseslint,
            'prettier': prettier,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
            'semi': ['error', 'always'],
            'quotes': ['error', 'double'],
            'prefer-const': 'error',
            'no-console': 'warn',
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];
