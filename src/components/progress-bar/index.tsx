import { Progress } from './styles';

export type ProgressBarProps = {
  max: number;
  value: number;
};

export const ProgressBar: React.VFC<ProgressBarProps> = (props) => {
  return <Progress max={props.max} value={props.value} />;
};
