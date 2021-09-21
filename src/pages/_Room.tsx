import Chat from "../components/Chat";
import { Message } from "../types";
import { groupByProperty } from "../utils";

const _Room = () => {

  return (
    <div className="root">
      <div className="header">
        <div className="left">
          <a
            href="/room"
            aria-current="page"
            className="is-wrapper nuxt-link-exact-active nuxt-link-active"
          >
            <div className="logo-small logo-mask"></div>
          </a>
          <h1 className="header-title">{/* {room title} */}</h1>
        </div>
        <div className="right">{/* put avatar here */}</div>
      </div>
      <div className="content is-center">
        <div className="room-wrapper">
          <div className="room">
            <video
              src="/assets/7bff043b.mp4"
              preload=""
              className="is-placeholder"
            ></video>
          </div>
        </div>
        {/* <Chat messages={messages} /> */}
      </div>
    </div>
  );
};

export default _Room;
