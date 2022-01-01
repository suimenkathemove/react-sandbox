module.exports = {
  plugins: ['stylelint-order'],
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        ignoreFiles: ['**/*.css', '**/*.scss'],
      },
    ],
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-styled-components',
  ],
  // MEMO: コメントアウトを外すとメッセージは表示されなくなるがlintが効かなくなる
  // customSyntax: '@stylelint/postcss-css-in-js',
  rules: {
    'string-quotes': 'single',
    'color-hex-length': 'long',
  },
  ignoreFiles: 'node_modules/**',
};
