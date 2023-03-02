import { forwardRef } from 'react';

import { Input } from './styles';

export type FileInputProps = {
  onChange: (file: File) => void;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (files == null) {
        return;
      }

      const file = files[0];

      if (file == null) {
        return;
      }

      props.onChange(file);
    };

    const onClick: JSX.IntrinsicElements['input']['onClick'] = (e) => {
      e.currentTarget.value = '';
    };

    return (
      <Input ref={ref} type="file" onChange={onChange} onClick={onClick} />
    );
  },
);
