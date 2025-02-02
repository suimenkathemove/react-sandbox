import { CurrentTimeSlider } from './current-time-slider';

type VideoControlProps = {
  progress: number;
  onChangeProgress: (progress: number) => void;
  onChangeStartProgress: () => void;
  onChangeEndProgress: () => void;
};

export const VideoControl: React.FC<VideoControlProps> = (props) => {
  return (
    <div>
      <CurrentTimeSlider
        value={props.progress}
        onChangeValue={props.onChangeProgress}
        onChangeStart={props.onChangeStartProgress}
        onChangeEnd={props.onChangeEndProgress}
      />
    </div>
  );
};
