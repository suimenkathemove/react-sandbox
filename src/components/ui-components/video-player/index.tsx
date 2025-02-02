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
  const [duration, setDuration] = useState(0);

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

  const onLoadedMetadata = () => {
    invariant(videoRef.current, 'videoRef.current is null');
    setDuration(videoRef.current.duration);
  };

  const onTimeUpdate = () => {
    invariant(videoRef.current, 'videoRef.current is null');
    const newProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(newProgress);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const onChangeProgress = (progress: number) => {
    setProgress(progress);

    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime =
        videoRef.current.duration * (progress / 100);
    }
  };

  const onChangeStartProgress = () => {
    invariant(videoRef.current, 'videoRef.current is null');
    videoRef.current.pause();
  };

  const onChangeEndProgress = async () => {
    invariant(videoRef.current, 'videoRef.current is null');
    await videoRef.current.play();
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const displayedTime = ((): string => {
    const formattedCurrentTime = formatTime(videoRef.current?.currentTime ?? 0);
    const formattedDuration = formatTime(duration);

    return `${formattedCurrentTime} / ${formattedDuration}`;
  })();

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={videoFile}
        ref={videoRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onClick={togglePlay}
      />
      <span>{isPlaying ? 'pause' : 'play'}</span>
      <span>{displayedTime}</span>
      <VideoControl
        progress={progress}
        onChangeProgress={onChangeProgress}
        onChangeStartProgress={onChangeStartProgress}
        onChangeEndProgress={onChangeEndProgress}
      />
    </div>
  );
};
