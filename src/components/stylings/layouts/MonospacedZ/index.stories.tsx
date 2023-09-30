import { Meta } from '@storybook/react';

import { MonospacedZ } from './';

import { range } from '@/utils/range';

export default { component: MonospacedZ } as Meta;

export const Default: React.VFC = () => {
  return (
    <MonospacedZ gap={{ row: 20, column: 80 }}>
      {range(100).map((i) => ({
        key: i,
        child: <div>{i.toString().padStart(2, '0')}</div>,
      }))}
    </MonospacedZ>
  );
};
