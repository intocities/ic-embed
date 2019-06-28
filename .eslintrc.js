module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['standard'],
  plugins: ['compat'],
  rules: {
    'compat/compat': 'error',
    'max-len': ['error', { code: 110 }]
  },
  globals: {
    CustomEvent: true
  }
}
