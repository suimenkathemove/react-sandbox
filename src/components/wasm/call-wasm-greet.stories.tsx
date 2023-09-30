import { Meta, Story } from '@storybook/react';
import { useEffect } from 'react';

const CallWasmGreet: React.VFC = () => {
  useEffect(() => {
    (async () => {
      // const { greet } = await import('wasm');
      // greet('John Doe');
    })();
  }, []);

  return null;
};

const meta: Meta = {
  component: CallWasmGreet,
};
export default meta;

const Template: Story<React.ComponentProps<typeof CallWasmGreet>> = (args) => (
  <CallWasmGreet {...args} />
);

export const Default = Template.bind({});
Default.args = {};
