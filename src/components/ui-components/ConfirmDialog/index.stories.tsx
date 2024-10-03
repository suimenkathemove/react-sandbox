import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback } from 'react';

import { ConfirmDialogProvider, useConfirmDialog } from './useConfirmDialog';

import { ConfirmDialog } from '.';

const meta = {
  title: 'ui/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOk: action('onOk'),
    onCancel: action('onCancel'),
    content: 'message',
    okText: 'ok',
  },
};

export const UseConfirmDialog: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const confirm = useConfirmDialog();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onClick = useCallback(async () => {
      const result = await confirm({
        content: '本当にログアウトしますか？',
        okText: 'ログアウトする',
      });
      if (result) {
        window.alert('ログアウトしました');
      }
    }, [confirm]);

    return <button onClick={onClick}>ログアウト</button>;
  },
  decorators: [
    (Story) => (
      <ConfirmDialogProvider>
        <Story />
      </ConfirmDialogProvider>
    ),
  ],
};
