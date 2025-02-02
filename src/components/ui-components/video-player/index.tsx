import { useEffect, useRef, useState } from 'react';

import videoFile from './assets/sample-video.mp4';
import { VideoControl } from './video-control';

import { invariant } from '@/utils/invariant';

type VideoPlayerProps = {
  // TODO
};

export const VideoPlayer: React.FC<VideoPlayerProps> = (_props) => {
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

  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = () => {
    invariant(videoRef.current, 'videoRef.current is null');
    const newProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(newProgress);
  };

  const onChangeProgress = (progress: number) => {
    setProgress(progress);

    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime =
        videoRef.current.duration * (progress / 100);
    }
  };

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={videoFile}
        ref={videoRef}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
      />
      <span>{isPlaying ? 'pause' : 'play'}</span>
      <VideoControl progress={progress} onChangeProgress={onChangeProgress} />
    </div>
  );
};
