import 'destyle.css';
import '@/styles/globals.scss';

import { withScreenshot } from 'storycap';

export const decorators = [(Story) => <Story />, withScreenshot];
