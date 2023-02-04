import { Meta, StoryObj } from '@storybook/react';

import { WasmMarkdownEditor, WasmMarkdownEditorProps } from './';

export default {
  component: WasmMarkdownEditor,
  excludeStories: ['defaultProps'],
} as Meta<WasmMarkdownEditorProps>;

export const defaultProps: WasmMarkdownEditorProps = {};

export const Default: StoryObj = {
  render: () => {
    return <WasmMarkdownEditor {...defaultProps} />;
  },
};
