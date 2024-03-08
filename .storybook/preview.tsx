import 'destyle.css';
import '@/styles/global.scss';
import './global.scss';

import { Preview } from '@storybook/react';
import MockDate from 'mockdate';
import { withScreenshot } from 'storycap';

import { worker } from '../src/mocks/browser';

MockDate.set('2022-01-01');

worker.start();

export default {
  decorators: [
    (Story) => (
      // @ts-expect-error
      <Story />
    ),
    // @ts-expect-error
    withScreenshot,
  ],
} satisfies Preview;
