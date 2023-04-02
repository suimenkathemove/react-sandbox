import { ComponentMeta, ComponentStory } from '@storybook/react';
import { range } from 'lodash-es';
import { useState } from 'react';

import { Pagination, PaginationProps } from './';

export default {
  title: 'Pagination',
  component: Pagination,
  excludeStories: ['defaultProps'],
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const defaultProps: PaginationProps = {
  lastPage: 10,
  currentPage: 1,
  onClickPage: (page) => {
    window.alert(page);
  },
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const All: React.VFC = () => {
  return (
    <>
      {range(1, 10 + 1).map((lastPage) => (
        <div key={lastPage}>
          <p>{lastPage}</p>
          {range(1, lastPage + 1).map((currentPage) => (
            <div key={currentPage}>
              <Pagination
                lastPage={lastPage}
                currentPage={currentPage}
                onClickPage={() => {}}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export const Demo: React.VFC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      lastPage={10}
      currentPage={currentPage}
      onClickPage={setCurrentPage}
    />
  );
};
