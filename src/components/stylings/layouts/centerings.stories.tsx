import { Meta } from '@storybook/react/types-6-0';

import { Component } from '@/components/component';

const meta: Meta = { title: 'stylings/layouts/centerings' };
export default meta;

// for `display: block;`
export const Margin0auto: React.FC = () => {
  return <Component style={{ margin: '0 auto' }} />;
};
