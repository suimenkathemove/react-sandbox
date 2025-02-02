import { useEffect, useRef, useState } from 'react';

import videoFile from './assets/sample-video.mp4';
import { VideoControl } from './video-control';

import { invariant } from '@/utils/invariant';

type VideoPlayerProps = {};

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // MEMO: 実際の再生状態はvideoRef.current.pausedで取得できる
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    void (async () => {
      invariant(videoRef.current, 'videoRef.current is null');

      if (isPlaying) {
        await videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    })();
  }, [isPlaying]);

  return (
    <div onClick={togglePlay}>
      <video src={videoFile} ref={videoRef} />
      <span>{isPlaying ? 'pause' : 'play'}</span>
      <VideoControl />
    </div>
  );
};
