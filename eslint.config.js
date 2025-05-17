import jseslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import boundaries from 'eslint-plugin-boundaries';
import eslintReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import'

/** @type {import('eslint').Linter.Config[]} */
export default [
  jseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['vite.config.ts', 'dist/**/*', 'build/**/*', 'node_modules/**/*'],

    languageOptions: {
      parser: parser,
      globals: globals.builtin,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },

    plugins: {
      react: eslintReact,
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      boundaries,
       import: importPlugin,
      'simple-import-sort': simpleImportSort,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      ...tsPlugin.configs['recommended'].rules,
      'arrow-body-style': 'warn',
      'default-case': 'error',
      'default-case-last': 'warn',
      'dot-notation': 'warn',
      "quotes": [2, "single", { "avoidEscape": true }],
      'no-caller': 'error',
      'no-console': 'warn',
      'no-eval': 'error',
      'no-labels': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      // 'no-shadow': 'warn',
      'no-template-curly-in-string': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': 'warn',
      'no-useless-backreference': 'error',
      'no-useless-computed-key': 'warn',
      'no-useless-concat': 'warn',
      'no-useless-constructor': 'warn',
      'no-useless-rename': 'warn',
      'no-var': 'warn',
      'object-shorthand': 'warn',
      'one-var': ['warn', 'never'],
      'prefer-arrow-callback': 'warn',
      'prefer-const': 'warn',
      'prefer-destructuring': ['warn', { object: true, array: false }],
      'prefer-exponentiation-operator': 'warn',
      'prefer-numeric-literals': 'warn',
      'prefer-object-spread': 'warn',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'warn',
      'prefer-rest-params': 'warn',
      'prefer-spread': 'warn',
      'prefer-template': 'warn',
      'react-refresh/only-export-components': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/no-duplicates': 'error',
      'simple-import-sort/imports': ['error',{

        "groups": [
            ['^type:\\u0000', '^type:react$', '^type:@?\\w', '^type:'],

      // 1. Side effect imports
      ['^\\u0000'],

      // 2. React и внешние пакеты
      ['^react$', '^@?\\w'],

      // 3. Абсолютные импорты (например, alias @/)
      ['^@/app'],
      ['^@/pages'],
      [ '^@/widgets'],
      [ '^@/features'],
      [ '^@/entities'],
      ['^@/shared'],

      // 4. Относительные: вверх и текущая папка
      ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
      ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

      // 5. Стили (модули и обычные)
      ['^.+\\.module\\.(css|scss)$'],
      ['^.+\\.(css|scss)$'],

      // 6. Медиа
      ['^.+\\.(gif|png|svg|jpg|jpeg|webp)$']
        ]
      }],
      'simple-import-sort/exports': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      curly: 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      strict: 'error',
      yoda: 'warn',
      'boundaries/entry-point': [
        2,
        {
          default: 'disallow',
          rules: [
            {
              target: [
                [
                  'shared',
                  {
                    segment: 'lib'
                  }
                ]
              ],
              allow: 'index.ts'
            },
            {
              target: [
                [
                  'shared',
                  {
                    segment: 'lib'
                  }
                ]
              ],
              allow: 'index.ts'
            },
            {
              target: [
                [
                  'shared',
                  {
                    segment: 'constants'
                  }
                ]
              ],
              allow: 'index.ts'
            },
            {
              target: [
                [
                  'shared',
                  {
                    segment: 'ui' // ("ui"|"constants")
                  }
                ]
              ],
              allow: 'index.ts'
            },
            {
              target: ['app', 'pages', 'widgets', 'features', 'entities'],
              allow: 'index.(ts|tsx)'
            }
          ]
        }
      ],
      'boundaries/element-types': [
        2,
        {
          default: 'allow',
          message: '${file.type} is not allowed to import (${dependency.type})',
          rules: [
            {
              from: ['shared'],
              disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
              message:
                'Shared module must not import upper layers (${dependency.type})'
            },
            {
              from: ['entities'],
              message:
                'Entity must not import upper layers (${dependency.type})',
              disallow: ['app', 'pages', 'widgets', 'features']
            },
            {
              from: ['entities'],
              message: 'Entity must not import other entity',
              disallow: [
                [
                  'entities',
                  {
                    entity: '!${entity}'
                  }
                ]
              ]
            },
            {
              from: ['features'],
              message:
                'Feature must not import upper layers (${dependency.type})',
              disallow: ['app', 'pages', 'widgets']
            },
            {
              from: ['features'],
              message: 'Feature must not import other feature',
              disallow: [
                [
                  'features',
                  {
                    feature: '!${feature}'
                  }
                ]
              ]
            },
            {
              from: ['widgets'],
              message:
                'Feature must not import upper layers (${dependency.type})',
              disallow: ['app', 'pages']
            },
            {
              from: ['widgets'],
              message: 'Widget must not import other widget',
              disallow: [
                [
                  'widgets',
                  {
                    widget: '!${widget}'
                  }
                ]
              ]
            },
            {
              from: ['pages'],
              message: 'Page must not import upper layers (${dependency.type})',
              disallow: ['app']
            },
            {
              from: ['pages'],
              message: 'Page must not import other page',
              disallow: [
                [
                  'pages',
                  {
                    page: '!${page}'
                  }
                ]
              ]
            }
          ]
        }
      ]
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        { type: 'app', pattern: 'app' },
        { type: 'pages', pattern: 'src/pages/*', capture: ['page'] },
        { type: 'widgets', pattern: 'widgets/*', capture: ['widget'] },
        { type: 'features', pattern: 'features/*', capture: ['feature'] },
        { type: 'entities', pattern: 'entities/*', capture: ['entity'] },
        { type: 'shared', pattern: 'shared/*', capture: ['segment'] }
      ]
    }
  }
];
