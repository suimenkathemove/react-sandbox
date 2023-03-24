import 'destyle.css';
import '@/styles/globals.scss';

import { NextUIProvider } from '@nextui-org/react';
import MockDate from 'mockdate';
import { withScreenshot } from 'storycap';

import { worker } from '../src/mocks/browser';

MockDate.set('2022-01-01');

export const decorators = [
  (Story) => (
    <NextUIProvider>
      <Story />
    </NextUIProvider>
  ),
  withScreenshot,
];

worker.start();
