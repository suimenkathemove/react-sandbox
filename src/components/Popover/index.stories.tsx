import { Meta } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Popover } from './';

import { alphabets } from '@/utils/alphabets';

const meta: Meta = { title: 'Popover', component: Popover };
export default meta;

export const Left: React.VFC = () => {
  const [isShown, setIsShown] = useState(false);
  const show = () => {
    setIsShown(true);
  };
  const hide = () => {
    setIsShown(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Popover
        trigger={<button onClick={show}>show</button>}
        placement="left"
        isShown={isShown}
        hide={hide}
      >
        {alphabets}
      </Popover>

      <p>text</p>
      <p>text</p>
    </div>
  );
};

export const Right: React.VFC = () => {
  const [isShown, setIsShown] = useState(false);
  const show = () => {
    setIsShown(true);
  };
  const hide = () => {
    setIsShown(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Popover
        trigger={<button onClick={show}>show</button>}
        placement="right"
        isShown={isShown}
        hide={hide}
      >
        {alphabets}
      </Popover>

      <p>text</p>
      <p>text</p>
    </div>
  );
};
