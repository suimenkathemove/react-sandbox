module.exports = {
  extends: ['@suimenkathemove/stylelint-config'],
  overrides: [
    {
      files: ['**/*.module.scss'],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
};
