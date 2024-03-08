import path from 'path';

import { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    'storycap',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
          },
        ],
      },
      plugins: [wasm()],
      experiments: {
        asyncWebAssembly: true,
      },
      define: {
        'process.env': {},
      },
    });
  },
} satisfies StorybookConfig;
