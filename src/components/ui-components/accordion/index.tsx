import { memo, useEffect, useRef, useState } from 'react';

import { Container } from './styles';

export type AccordionProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export const Accordion = memo<AccordionProps>((props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(ref.current!.offsetHeight);
  }, []);

  return (
    <>
      <Container isOpen={props.isOpen} height={height}>
        <div ref={ref}>{props.children}</div>
      </Container>
    </>
  );
});
