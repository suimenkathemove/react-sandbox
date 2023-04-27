import { Img } from './styles';

export type SlideImageProps = {
  url: string;
  imageWidth: number;
  height: number;
  duration: number;
};

export const SlideImage: React.FC<SlideImageProps> = (props) => {
  return (
    <Img
      url={props.url}
      imageWidth={props.imageWidth}
      height={props.height}
      duration={props.duration}
    />
  );
};
