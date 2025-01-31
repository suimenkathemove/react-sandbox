import { useRef, useState } from 'react';

import videoFile from './assets/sample-video.mp4';

type VideoPlayerProps = {};

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // MEMO: 実際の再生状態はvideoRef.current.pausedで取得できる
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    if (!videoRef.current) {
      // TODO
      return;
    }

    if (videoRef.current.paused) {
      await videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div onClick={togglePlay}>
      <video src={videoFile} ref={videoRef} />
      <span>{isPlaying ? 'pause' : 'play'}</span>
    </div>
  );
};
