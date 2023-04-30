import range from 'lodash-es/range';
import { memo, useCallback, useMemo } from 'react';

import { Container, Text } from './styles';

import { useTimer } from '@/hooks/use-timer';

const TEXTS_SIZE = 4;
const PART_SECONDS = 3;
const CYCLE_SECONDS = PART_SECONDS * TEXTS_SIZE;

const createOn = (index: number, seconds: number) => {
  const cycleRemainder = seconds % CYCLE_SECONDS;

  return (
    index * PART_SECONDS <= cycleRemainder &&
    cycleRemainder < (index + 1) * PART_SECONDS
  );
};

export const DemaeCanText = memo(function DemaeCanText() {
  const seconds = useTimer();

  const ons = useMemo(
    () => range(TEXTS_SIZE).map((index) => createOn(index, seconds)),
    [seconds],
  );

  const createStyle = useCallback(
    (index: number): React.CSSProperties => {
      const prevOn = index !== 0 ? ons[index - 1] : ons[ons.length - 1];

      return {
        clipPath: prevOn
          ? 'polygon(0px 0px, 0px 0px, 0px 100%, 0% 100%)'
          : 'polygon(0px 0px, 100% 0px, 100% 100%, 0% 100%)',
        opacity: ons[index] ? 1 : 0,
        transform: `translateX(${prevOn ? -20 : 0}px)`,
        transition: 'clip-path 0.5s, opacity 0.3s, transform 0.5s',
      };
    },
    [ons],
  );

  const style0 = useMemo(() => createStyle(0), [createStyle]);
  const style1 = useMemo(() => createStyle(1), [createStyle]);
  const style2 = useMemo(() => createStyle(2), [createStyle]);
  const style3 = useMemo(() => createStyle(3), [createStyle]);

  return (
    <Container>
      <Text style={style0}>00000</Text>
      <Text style={style1}>11111</Text>
      <Text style={style2}>22222</Text>
      <Text style={style3}>33333</Text>
    </Container>
  );
});
