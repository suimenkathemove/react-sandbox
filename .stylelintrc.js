module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  plugins: ["stylelint-order"],
  ignoreFiles: ["**/node_modules/**", "**/*.{js,jsx,ts,tsx}"],
  rules: {
    "string-quotes": "single",
    "color-hex-length": "long",
  },
};
