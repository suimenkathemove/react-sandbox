import { Meta, StoryObj } from '@storybook/react';

import { SlideImage, SlideImageProps } from './';

export default {
  component: SlideImage,
} as Meta<SlideImageProps>;

export const Default: StoryObj = {
  render: () => {
    return (
      <SlideImage
        url="https://picsum.photos/100"
        imageWidth={100}
        height={100}
        duration={1}
      />
    );
  },
};
