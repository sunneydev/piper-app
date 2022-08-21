import { useEffect, useState } from "react";
import { Loading } from "@nextui-org/react";
import { useUser } from "../lib/useUser";
import useRoom from "../lib/hooks/useRoom";
import Avatars from "../components/Avatars";
import IMovies from "../components/iMovies";
import Header from "../components/Header";
import Center from "../components/Center";
import Video from "../components/Video";
import Chat from "../components/Chat";
import { Episode } from "../typings";

type MovieEpisode = {
  season: number;
  episode: Episode;
};

const Room = () => {
  const user = useUser();
  const { state, dispatch, sendMessage } = useRoom();
  const [visible, setVisible] = useState(false);
  const [episode, setEpisode] = useState<MovieEpisode>();

  useEffect(() => {
    if (!episode) return;

    const ep = episode.episode.files[episode.episode.files.length - 1];

    dispatch({
      type: "set-video",
      payload: {
        paused: false,
        time: 0,
        url: ep.src,
        subtitle: ep.subtitles.find((s) => s.lang === "ENG")?.url,
      },
    });
  }, [episode]);

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
        <IMovies onEpisode={setEpisode} modal />
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
