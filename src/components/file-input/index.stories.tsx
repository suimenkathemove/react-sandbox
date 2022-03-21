import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useRef } from 'react';

import { FileInput, FileInputProps } from './';

export default {
  title: 'FileInput',
  component: FileInput,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => (
  <FileInput {...args} />
);

export const defaultProps: FileInputProps = {
  onChange: (file) => {
    window.alert(file);
  },
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const Demo: React.VFC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {
    fileInputRef.current!.click();
  };

  const onChangeFileInput: FileInputProps['onChange'] = (file) => {
    window.alert(file.name);
  };

  return (
    <>
      <button onClick={onClickButton}>input file</button>
      <FileInput ref={fileInputRef} onChange={onChangeFileInput} />
    </>
  );
};
