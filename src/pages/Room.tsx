import type { Action, IRoomState } from "../typings";
import type { Socket } from "socket.io-client";

import { Avatar, Loading } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useUser } from "../lib/useUser";
import Video from "../components/Video";
import Header from "../components/Header";
import Center from "../components/Center";
import Chat from "../components/Chat";

const Room = () => {
  const initialState: IRoomState = {
    id: "",
    name: "",
    users: [],
    messages: [],
    video: {
      url: "",
      paused: true,
      time: 0,
    },
    ownerId: "",
    loading: true,
  };

  const user = useUser();
  const { roomId } = useParams();
  const [state, _dispatch] = useReducer(reducer, initialState);
  const [socket, setSocket] = useState<Socket>();

  const commands = useMemo<{ [cmd in "pause" | "play" | "set"]: (args?: string[]) => Action }>(
    () => ({
      pause: () => ({
        type: "set-video",
        payload: {
          ...state.video,
          paused: true,
        },
      }),
      play: () => ({
        type: "set-video",
        payload: {
          ...state.video,
          paused: false,
        },
      }),
      set: (args) => ({
        type: "set-video",
        payload: {
          time: 0,
          paused: false,
          url: args ? args[0] : "",
        },
      }),
    }),
    [state.video]
  );

  const dispatchCommand = useCallback(
    (fullCmd: string) => {
      const [command, ...args] = fullCmd.split(" ");
      const aliases: {
        [alias in keyof typeof commands]: string[];
      } = {
        pause: ["pause", "p", "pauw", "monopause", "pruw", "puwu", "mennopause", "menopause", "uwu"],
        play: ["play", "start", "daiwye", "pway", "meow", "owo"],
        set: ["set", "set-video", "set-video-url", "set-video-url-to", "set-video-url-to", "bruwu"],
      };

      const cmd = Object.entries(aliases).find(([, value]) => value.includes(command))?.[0] as
        | keyof typeof commands
        | undefined;

      if (cmd) {
        const action = commands[cmd](args);
        dispatch(action);
        dispatch({ type: "cmd", payload: cmd });
      }
    },
    [state.video]
  );

  useEffect(() => {
    const socket = io("https://piper-api.sunney.dev");

    setSocket(socket);

    socket.on("connect", () => {
      socket.emit("join", { roomId, user });
      socket.on("action", _dispatch);
    });

    return () => {
      socket.off("action");
      socket.off("connect");
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [roomId, user]);

  if (state.loading) {
    return (
      <Center>
        <Loading size={"xl"} type="points" textColor="white" />
      </Center>
    );
  }

  const dispatch = (action: Action) => {
    _dispatch(action);
    socket?.emit("action", action);
  };

  const sendMessage = (message: string) => {
    if (message.startsWith("/")) {
      dispatchCommand(message.substring(1));
      message = message.split(" ")[0];
    }

    dispatch({
      type: "add-message",
      payload: {
        authorId: user.id,
        author: user,
        content: message,
      },
    });
  };

  return (
    <div className="flex flex-col">
      <Header>
        <Avatar.Group>
          {state.users.map((user) => (
            <Avatar key={user.id} src={user.avatar} size="xl" color={"gradient"} bordered />
          ))}
        </Avatar.Group>
      </Header>
      <div
        className="flex flex-col items-center md:flex-row "
        style={{
          height: "calc(100vh - 104px)",
        }}
      >
        <Video videoData={state.video} emitAction={dispatch} owner={state.ownerId === user.id} />
        <Chat messages={state.messages} onMessageSubmit={sendMessage} />
      </div>
    </div>
  );
};

const reducer = (state: IRoomState, action: Action): IRoomState => {
  switch (action.type) {
    case "add-user":
    case "remove-user":
      return {
        ...state,
        users:
          action.type === "add-user"
            ? [...state.users, action.payload]
            : state.users.filter((user) => user.id !== action.payload.id),
      };
    case "add-message":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "set-video":
      return {
        ...state,
        video: action.payload,
      };
    case "room":
      return {
        ...action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default Room;
