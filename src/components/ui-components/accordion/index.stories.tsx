import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { Accordion, AccordionProps } from './';

import { Component } from '@/components/component';

export default {
  component: Accordion,
  excludeStories: ['defaultProps'],
} as Meta<AccordionProps>;

export const defaultProps: AccordionProps = {
  isOpen: false,
  children: <Component />,
};

export const Default: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toggleIsOpen = useCallback(() => {
      setIsOpen((isOpen) => !isOpen);
    }, []);

    return (
      <>
        <button onClick={toggleIsOpen}>{isOpen ? 'close' : 'open'}</button>
        <Accordion {...defaultProps} isOpen={isOpen} />
      </>
    );
  },
};
