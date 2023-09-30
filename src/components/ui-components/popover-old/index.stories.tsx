import { Meta } from '@storybook/react';

import { Popover } from '.';

import { alphabets } from '@/utils/alphabets';
import { useShow } from '@/utils/useShow';

const meta: Meta = {
  component: Popover,
  title: 'components/Ui Components/PopoverOld',
};
export default meta;

export const Left: React.VFC = () => {
  const { isShown, show, hide } = useShow();

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
  const { isShown, show, hide } = useShow();

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
