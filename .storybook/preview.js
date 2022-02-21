import 'destyle.css';
import '@/styles/globals.scss';

import MockDate from 'mockdate';
import { withScreenshot } from 'storycap';

MockDate.set('2022-01-01');

export const decorators = [(Story) => <Story />, withScreenshot];
