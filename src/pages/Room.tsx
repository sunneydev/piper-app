import { Avatar, Loading } from "@nextui-org/react";
import { useUser } from "../lib/useUser";
import Video from "../components/Video";
import Header from "../components/Header";
import Center from "../components/Center";
import Chat from "../components/Chat";
import IMovies from "../components/iMovies";
import useRoom from "../lib/hooks/useRoom";

const Room = () => {
  const user = useUser();
  const { state, dispatch, sendMessage } = useRoom();

  if (state.loading) {
    return (
      <Center>
        <Loading size={"xl"} />
      </Center>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <Header>
        <IMovies />
        <Avatar.Group>
          {state.users.map((user) => (
            <Avatar
              key={user.id}
              src={user.avatar}
              size="lg"
              color={"gradient"}
              bordered
            />
          ))}
        </Avatar.Group>
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
