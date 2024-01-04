/* eslint-disable jest-dom/prefer-to-have-text-content */
import { createRoot } from 'react-dom/client';

import { Counter } from './';

beforeEach(() => {
  document.body.innerHTML = '';
});

xtest('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div');
  document.body.append(div);
  createRoot(div).render(<Counter />);

  const [decrement, increment] = div.querySelectorAll('button');
  const count = div.querySelector('span');

  expect(count!.textContent).toBe('0');

  increment!.click();
  expect(count!.textContent).toBe('1');

  decrement!.click();
  expect(count!.textContent).toBe('0');
});
