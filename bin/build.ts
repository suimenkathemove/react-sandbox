// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { build } = require('esbuild');

void build({
  entryPoints: [path.resolve(__dirname, '../src/index.ts')],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'browser',
  format: 'cjs',
  external: ['react', 'react-dom'],
  minify: true,
  sourcemap: true,
});
