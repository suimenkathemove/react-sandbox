import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

import videoFile from './assets/sample-video.mp4';
import { VideoControl } from './video-control';

import { invariant } from '@/utils/invariant';

const currentTimeToProgress = (currentTime: number, duration: number): number =>
  (currentTime / duration) * 100;

const progressToCurrentTime = (progress: number, duration: number): number =>
  duration * (progress / 100);

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const Container = styled.div`
  position: relative;
  width: 640px;
  height: 480px;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoControlWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 12px;
`;

type VideoPlayerProps = {
  // TODO
};

export const VideoPlayer: React.FC<VideoPlayerProps> = (_props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // MEMO: 実際の再生状態はvideoRef.current.pausedで取得できる
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

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

  const onLoadedMetadata = () => {
    invariant(videoRef.current, 'videoRef.current is null');
    setDuration(videoRef.current.duration);
  };

  const onTimeUpdate = () => {
    invariant(videoRef.current, 'videoRef.current is null');
    const newProgress = currentTimeToProgress(
      videoRef.current.currentTime,
      videoRef.current.duration,
    );
    setProgress(newProgress);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const onChangeProgress = (progress: number) => {
    setProgress(progress);

    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = progressToCurrentTime(
        progress,
        videoRef.current.duration,
      );
    }
  };

  const onChangeStartProgress = () => {
    setIsPlaying(false);
  };

  const onChangeEndProgress = () => {
    setIsPlaying(true);
  };

  const displayedTime = ((): string => {
    const currentTime = progressToCurrentTime(progress, duration);
    const formattedCurrentTime = formatTime(currentTime);
    const formattedDuration = formatTime(duration);

    return `${formattedCurrentTime} / ${formattedDuration}`;
  })();

  return (
    <Container>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <Video
        src={videoFile}
        ref={videoRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onClick={togglePlay}
      />
      <VideoControlWrapper>
        <VideoControl
          progress={progress}
          onChangeProgress={onChangeProgress}
          onChangeStartProgress={onChangeStartProgress}
          onChangeEndProgress={onChangeEndProgress}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          displayedTime={displayedTime}
        />
      </VideoControlWrapper>
    </Container>
  );
};
