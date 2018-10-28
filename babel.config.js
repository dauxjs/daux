const presets = [
  [
    '@babel/env',
    {
      targets: {
        browsers: ['ie >= 11'],
      },
      useBuiltIns: 'usage',
    },
  ],
];

module.exports = { presets };
