module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 'off',
    'no-trailing-spaces': 'off',
    'no-prototype-builtins': 'off',
    'eol-last': 'off',
    'key-spacing': 'off',
    'space-before-function-paren': 'off',
    'quote-props': 'off'
  }
}
