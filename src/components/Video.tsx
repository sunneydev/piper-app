import { useEffect, useRef, useCallback } from "react";
import { Action, VideoData } from "../types";

const Video = (props: {
  videoData: VideoData;
  owner: boolean;
  emitAction: (action: Action) => void;
}) => {
  const { emitAction, owner, videoData } = props;

  const videoRef = useRef<HTMLVideoElement>(null);

  const emitVideoData = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      emitAction({
        type: "SET",
        property: "video",
        payload: {
          url: video.src,
          time: owner ? video.currentTime : videoData.time,
          paused: video.paused,
        },
      });
    }
  }, [owner, videoData, emitAction]);

  const handleTicker = useCallback(() => {
    if (!videoRef.current) {
      return;
    }

    const video = videoRef.current;
    const timeDiff = Math.abs(video.currentTime - videoData.time);

    if (timeDiff > 2) {
      video.currentTime = videoData.time;
    }

    if (videoData.paused && !video.paused) {
      video.pause();
    } else if (!videoData.paused && video.paused) {
      video
        .play()
        .then(() => {})
        .catch(() => {});
    }

    if (owner && !video.paused) {
      emitVideoData();
    }
  }, [owner, videoData, emitVideoData]);

  useEffect(() => {
    const interval = setInterval(handleTicker, 100);
    return () => clearInterval(interval);
  }, [videoData, handleTicker, emitVideoData]);

  return (
    <video
      muted
      autoPlay
      controls
      style={{ width: "100%", height: "100%" }}
      ref={videoRef}
      src={videoData.url}
      onPause={emitVideoData}
      onPlay={emitVideoData}
    />
  );
};

export default Video;
