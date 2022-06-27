import 'destyle.css';
import '@/styles/globals.scss';

import MockDate from 'mockdate';
import { withScreenshot } from 'storycap';
import { worker } from '../src/mocks/browser';

MockDate.set('2022-01-01');

export const decorators = [(Story) => <Story />, withScreenshot];

worker.start();
