import { useEffect, useRef, useCallback } from "react";
import { Action, IVideo } from "../typings";

const Video = (props: { videoData: IVideo; owner: boolean; emitAction: (action: Action) => void }) => {
  const { emitAction, owner, videoData } = props;

  const videoRef = useRef<HTMLVideoElement>(null);

  const emitVideoData = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      emitAction({
        type: "set-video",
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
    const interval = setInterval(handleTicker, 1000);
    return () => clearInterval(interval);
  }, [videoData, handleTicker, emitVideoData]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (videoRef.current?.currentTime < 1 && videoData.time > 0 && owner) {
      videoRef.current.currentTime = videoData.time;
    }
  }, [videoRef.current]);

  return (
    <div className="border border-solid border-gray-100/20 p-2 w-full h-full">
      <video
        muted
        autoPlay
        controls
        className="h-[93%] "
        style={{ width: "100%", height: "100%" }}
        ref={videoRef}
        src={videoData.url}
        onPause={emitVideoData}
        onPlay={emitVideoData}
      />
    </div>
  );
};

export default Video;
