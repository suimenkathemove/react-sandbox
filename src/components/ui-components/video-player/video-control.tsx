import { Pause, Play } from 'react-feather';
import { styled } from 'styled-components';

import { CurrentTimeSlider } from './current-time-slider';

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
`;

const DisplayedTime = styled.span`
  color: white;
`;

type VideoControlProps = {
  progress: number;
  onChangeProgress: (progress: number) => void;
  onChangeStartProgress: () => void;
  onChangeEndProgress: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  displayedTime: string;
};

export const VideoControl: React.FC<VideoControlProps> = (props) => {
  const PlayButtonIcon = props.isPlaying ? Pause : Play;

  return (
    <div>
      <CurrentTimeSlider
        value={props.progress}
        onChangeValue={props.onChangeProgress}
        onChangeStart={props.onChangeStartProgress}
        onChangeEnd={props.onChangeEndProgress}
      />
      <SubContainer>
        <button onClick={props.togglePlay}>
          <PlayButtonIcon size={20} color="white" fill="white" />
        </button>
        <DisplayedTime>{props.displayedTime}</DisplayedTime>
      </SubContainer>
    </div>
  );
};
