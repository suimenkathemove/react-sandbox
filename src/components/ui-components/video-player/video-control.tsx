import { CurrentTimeSlider } from './current-time-slider';

type VideoControlProps = {
  progress: number;
  onChangeProgress: (progress: number) => void;
};

export const VideoControl: React.FC<VideoControlProps> = (props) => {
  return (
    <div>
      <CurrentTimeSlider
        value={props.progress}
        onChangeValue={props.onChangeProgress}
      />
    </div>
  );
};
