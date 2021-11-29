module.exports = (api) => {
  const isTest = api.env('test')
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
        // useBuiltIns: 'usage',
        // corejs: 3,
      }
    ],
    '@babel/preset-typescript'
  ]

  return {
    presets
  }
}
