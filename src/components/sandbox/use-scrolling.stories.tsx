import type { Meta, StoryObj } from '@storybook/react';

import { useScrolling } from '@/hooks/use-scrolling';

export default {} as Meta;

const Component: React.FC = () => {
  const scrolling = useScrolling();

  return (
    <>
      {scrolling ? 'scrolling' : 'not scrolling'}
      <div style={{ overflow: 'auto' }}>
        <div style={{ width: '200%', height: 100, backgroundColor: 'red' }} />
      </div>
    </>
  );
};

export const Default: StoryObj = {
  render: () => {
    return <Component />;
  },
};
