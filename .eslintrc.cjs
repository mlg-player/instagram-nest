module.exports = {
      parser: '@typescript-eslint/parser',
      parserOptions: {
            project: './tsconfig.json',
            ecmaVersion: 'latest',
            sourceType: 'module',
      },
      plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
      extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:prettier/recommended',
            'eslint:recommended',
            "plugin:import/recommended",
            "plugin:import/warnings",
            "plugin:import/typescript",
      ],
      root: true,
      env: {
            node: true,
            jest: true,
      },
      ignorePatterns: ['.eslintrc.cjs'],
      rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'prettier/prettier': [
                  'error',
                  {
                        endOfLine: 'auto',
                  },
            ],

            '@typescript-eslint/no-unused-vars': [
                  'error',
                  {
                        ignoreRestSiblings: true,
                        caughtErrorsIgnorePattern: '^ignore',
                        vars: 'all',
                        args: 'none',
                  },
            ],
            'no-unused-vars': 'off',
            'prettier/prettier': [
                  'error',
                  {
                        endOfLine: 'auto',
                        tabWidth: 4,
                  },
            ],
            'import/namespace': 'off',
            'no-undef': 'off',

            
            "@typescript-eslint/consistent-type-imports": [
                  "error",
                  {
                        prefer: "type-imports",
                  },
            ],
            "sort-imports": ["off"],
            "import/no-unresolved": ["off"],

            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                  "warn",
                  {
                        ignoreRestSiblings: true,
                        caughtErrorsIgnorePattern: "^ignore",
                  },
            ],
            "import/order": [
                  "error",
                  {
                        groups: [
                              "builtin",
                              "external",
                              "parent",
                              "sibling",
                              "index",
                              "object",
                              "type",
                        ],
                        pathGroups: [
                              {
                                    pattern: "@/**/**",
                                    group: "parent",
                                    position: "before",
                              },
                        ],
                        "newlines-between": "always",
                        alphabetize: { order: "asc" },
                  },
            ],
      },
};
