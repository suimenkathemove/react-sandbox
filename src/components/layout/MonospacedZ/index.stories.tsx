import { Meta } from '@storybook/react/types-6-0';

import { MonospacedZ } from './';

import { range } from '@/utils/range';

const meta: Meta = { title: 'layout/MonospacedZ', component: MonospacedZ };
export default meta;

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
