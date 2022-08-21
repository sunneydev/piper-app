import { useState } from "react";
import { Loading } from "@nextui-org/react";
import { useUser } from "../lib/useUser";
import SearchModal from "../components/SearchModal";
import useRoom from "../lib/hooks/useRoom";
import Avatars from "../components/Avatars";
import IMovies from "../components/iMovies";
import Header from "../components/Header";
import Center from "../components/Center";
import Video from "../components/Video";
import Chat from "../components/Chat";

const Room = () => {
  const user = useUser();
  const { state, dispatch, sendMessage } = useRoom();
  const [visible, setVisible] = useState(false);

  if (state.loading) {
    return (
      <Center>
        <Loading size={"xl"} />
      </Center>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <SearchModal visible={visible} onClose={() => setVisible(false)} />
      <Header>
        <IMovies onClick={() => setVisible(true)} />
        <Avatars users={state.users} />
      </Header>
      <div
        className="flex flex-col items-center md:flex-row"
        style={{ height: "calc(100vh - 65px)" }}
      >
        <Video
          videoData={state.video}
          emitAction={dispatch}
          owner={state.ownerId === user.id}
        />
        <Chat messages={state.messages} onMessageSubmit={sendMessage} />
      </div>
    </div>
  );
};

export default Room;
