import { useEffect, useRef } from 'react';

import { PersonCountAndPersonToPersonListInputs } from './components/person-count-and-person-to-person-list-inputs';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FEMALE_Y_RATIO,
  MALE_Y_RATIO,
} from './constants';
import { usePersonCount } from './hooks/use-person-count';
import { usePersonToPersonList } from './hooks/use-person-to-person-list';
import { linePersonToPerson } from './utils/line-person-to-person';
import { pointPerson } from './utils/point-person';
import { resetCanvas } from './utils/reset-canvas';

import { onUpdateFrame } from '@/utils/onUpdateFrame';

export const Lovemageddon: React.VFC = () => {
  const { personCount: maleCount, onChangePersonCount: onChangeMaleCount } =
    usePersonCount(2);
  const { personCount: femaleCount, onChangePersonCount: onChangeFemaleCount } =
    usePersonCount(2);

  const {
    personToPersonList: maleToFemaleList,
    onChangePersonToPersonList: onChangeMaleToFemaleList,
  } = usePersonToPersonList(maleCount);
  const {
    personToPersonList: femaleToMaleList,
    onChangePersonToPersonList: onChangeFemaleToMaleList,
  } = usePersonToPersonList(femaleCount);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;

    onUpdateFrame(() => {
      resetCanvas(ctx);

      pointPerson(ctx, maleCount, MALE_Y_RATIO);
      pointPerson(ctx, femaleCount, FEMALE_Y_RATIO);

      linePersonToPerson(
        ctx,
        maleToFemaleList,
        maleCount,
        femaleCount,
        MALE_Y_RATIO,
        FEMALE_Y_RATIO,
      );
      linePersonToPerson(
        ctx,
        femaleToMaleList,
        femaleCount,
        maleCount,
        FEMALE_Y_RATIO,
        MALE_Y_RATIO,
      );
    });
  }, [femaleCount, femaleToMaleList, maleCount, maleToFemaleList]);

  return (
    <div>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      <div style={{ display: 'flex' }}>
        <PersonCountAndPersonToPersonListInputs
          meLabel="male"
          youLabel="female"
          meCount={maleCount}
          onChangeMeCount={onChangeMaleCount}
          youCount={femaleCount}
          personToPersonList={maleToFemaleList}
          onChangePersonToPersonList={onChangeMaleToFemaleList}
        />
        <PersonCountAndPersonToPersonListInputs
          meLabel="female"
          youLabel="male"
          meCount={femaleCount}
          onChangeMeCount={onChangeFemaleCount}
          youCount={maleCount}
          personToPersonList={femaleToMaleList}
          onChangePersonToPersonList={onChangeFemaleToMaleList}
        />
      </div>
    </div>
  );
};
