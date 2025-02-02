import { useState } from 'react';
import { styled } from 'styled-components';

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background-color: white;
`;

const Fill = styled.div`
  background-color: red;
`;

const Thumb = styled.div`
  width: 12px;
  height: 12px;
  background-color: red;
  border-radius: 50%;
`;

export const CurrentTimeSlider: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <Track>
      <Fill />
      <Thumb />
    </Track>
  );
};
