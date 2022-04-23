import type { IVideo } from "../typings";

const Video = (props: IVideo | undefined) => {
  return (
    <div className="grow mb-2">
      <video className="h-full" controls />
    </div>
  );
};

export default Video;
