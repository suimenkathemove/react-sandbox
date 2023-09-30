import { Meta } from '@storybook/react';

import { Component } from '@/components/component';

export default {} as Meta;

// for `display: block;`
export const Margin0auto: React.FC = () => {
  return <Component style={{ margin: '0 auto' }} />;
};
