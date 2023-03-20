import {
  TextlintKernel,
  TextlintKernelOptions,
  TextlintKernelRule,
} from '@textlint/kernel';
import { moduleInterop } from '@textlint/module-interop';
import { useEffect, useState } from 'react';
import { rules, rulesConfig } from 'textlint-rule-preset-japanese';

const kernel = new TextlintKernel();

const options: TextlintKernelOptions = {
  ext: '.txt',
  plugins: [
    {
      pluginId: 'text',
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      plugin: moduleInterop(require('@textlint/textlint-plugin-text')),
    },
  ],
  rules: Object.keys(rules).reduce(
    (acc: TextlintKernelRule[], rule) => [
      ...acc,
      { ruleId: rule, rule: rules[rule], options: rulesConfig[rule] },
    ],
    [],
  ),
};

export const TextlintSandbox: React.FC = () => {
  const [value, setValue] = useState('');

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const result = await kernel.lintText(value, options);
      // eslint-disable-next-line no-console
      console.log(result);
    })();
  }, [value]);

  return <textarea value={value} onChange={onChange} />;
};
