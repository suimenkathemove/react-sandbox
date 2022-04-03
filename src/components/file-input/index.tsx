import { forwardRef } from 'react';

import { Input } from './styles';

export type FileInputProps = {
  onChange: (file: File) => void;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (files == null) {
        return;
      }

      const file = files[0];

      if (file == null) {
        return;
      }

      props.onChange(file);
    };

    return <Input ref={ref} type="file" onChange={onChange} />;
  },
);
