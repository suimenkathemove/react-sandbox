import { ComponentMeta } from '@storybook/react';
import { useEffect } from 'react';

export const Default: React.VFC = () => {
  useEffect(() => {
    (async () => {
      const response = await fetch('https://example.com');
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log(data);
    })();
  }, []);

  return <></>;
};

export default {
  title: 'MSW',
  component: Default,
} as ComponentMeta<typeof Default>;
