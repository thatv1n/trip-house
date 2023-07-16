/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const tsConfigDir = __dirname;

const reactOverrides = {
  'react/destructuring-assignment': 'off',
  'react/no-array-index-key': 'off',
  'react/no-multi-comp': ['error', { ignoreStateless: true }],
  'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
  'react/prop-types': 'off',
  'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
  'react/function-component-definition': 'off',
};

const jsxOverrides = {
  'jsx-a11y/click-events-have-key-events': 'off',
  'jsx-a11y/label-has-for': 'off',
  'jsx-a11y/no-noninteractive-element-interactions': 'off',
  'jsx-a11y/no-static-element-interactions': 'off',
};

const various = {
  'prettier/prettier': 'warn',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
};

const _extends = [
  'airbnb',
  'plugin:@typescript-eslint/recommended',
  'plugin:prettier/recommended',
  // 'prettier/@typescript-eslint',
  // 'prettier/react',
];
const plugins = ['@typescript-eslint', 'react', 'react-hooks'];

const coreOverrides = {
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': ['error'],
  'class-methods-use-this': 'off',
  'lines-between-class-members': 'off',
  'react/react-in-jsx-scope': 'off',
  'no-plusplus': 'off',
  'no-use-before-define': 'off',
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ForInStatement',
      message: 'Use Object.{keys,values,entries}, and iterate over the resulting array.',
    },
    {
      selector: 'LabeledStatement',
      message: 'Labels are a form of GOTO; using them makes code hard to maintain and understand.',
    },
    {
      selector: 'WithStatement',
      message: '`with` is disallowed in strict mode because it makes code impossible to predict.',
    },
  ],
  'comma-dangle': [
    'warn',
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'only-multiline',
      functions: 'always-multiline',
    },
  ],
  'no-underscore-dangle': 'off',
};

const importOverrides = {
  'import/prefer-default-export': 'off',
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/test/**/*.{ts,tsx}'],
      packageDir: ['./'],
    },
  ],
  'import/order': 'off',
  'import/no-cycle': 'off',
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
  'import/export': 'off',
};

const typescriptOverrides = {
  '@typescript-eslint/array-type': 'off',
  '@typescript-eslint/ban-ts-comment': 'error',
  '@typescript-eslint/camelcase': 'off',
  '@typescript-eslint/explicit-member-accessibility': 'off',
  '@typescript-eslint/explicit-function-return-type': [
    'warn',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
    },
  ],
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true }],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-namespace': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true,
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
    },
  ],
};

const jsExtensions = ['.js'];
const tsExtensions = ['.ts', '.tsx', '.d.ts'];
const assetsExtensions = ['jpg', 'jpeg', 'png', 'svg', 'css', 'scss', 'json'];

module.exports = {
  extends: [
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    // 'prettier/@typescript-eslint',
    ..._extends,
  ],
  rules: {
    ...coreOverrides,
    ...importOverrides,
    ...typescriptOverrides,
    ...various,
    ...reactOverrides,
    ...jsxOverrides,
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(tsConfigDir, 'tsconfig.eslint.json'),
  },
  plugins,
  settings: {
    'import/resolver': {
      typescript: {
        project: tsConfigDir,
      },
    },
    'import/extensions': jsExtensions.concat(tsExtensions),
    'import/parsers': { '@typescript-eslint/parser': tsExtensions },
    'import/ignore': ['node_modules', `\\.(${assetsExtensions.join('|')})$`],
  },
};
