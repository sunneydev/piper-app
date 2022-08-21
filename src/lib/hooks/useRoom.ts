import { useReducer, useState, useMemo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { IRoomState, Action } from "../../typings";
import { useUser } from "../useUser";

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

const useRoom = () => {
  const user = useUser();

  const initialState: IRoomState = {
    id: "",
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

  const { roomId } = useParams();
  const [state, _dispatch] = useReducer(reducer, initialState);
  const [socket, setSocket] = useState<Socket>();

  const commands = useMemo<{
    [cmd in "pause" | "play" | "set" | "seek"]: (args?: string[]) => Action;
  }>(
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
      seek: (args) => {
        if (!args || !args.length)
          return { type: "set-video", payload: state.video };

        const seek = parseInt(args[0], 10);

        const newTime = state.video.time - seek;

        return {
          type: "set-video",
          payload: {
            ...state.video,
            time: newTime,
          },
        };
      },
    }),
    [state.video]
  );

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

  const dispatchCommand = useCallback(
    (fullCmd: string) => {
      const [command, ...args] = fullCmd.split(" ");
      const aliases: {
        [alias in keyof typeof commands]: string[];
      } = {
        pause: [
          "pause",
          "p",
          "pauw",
          "monopause",
          "pruw",
          "puwu",
          "mennopause",
          "menopause",
          "uwu",
        ],
        play: ["play", "start", "daiwye", "pway", "meow", "owo"],
        set: [
          "set",
          "set-video",
          "set-video-url",
          "set-video-url-to",
          "set-video-url-to",
          "bruwu",
        ],
        seek: ["s", "seek", "mewo"],
      };

      const cmd = Object.entries(aliases).find(([, value]) =>
        value.includes(command)
      )?.[0] as keyof typeof commands | undefined;

      if (cmd) {
        const action = commands[cmd](args);
        dispatch(action);
        dispatch({ type: "cmd", payload: cmd });
      }
    },
    [state.video]
  );

  useEffect(() => {
    const socket = io("http://localhost:5000");

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

  const dispatch = (action: Action) => {
    _dispatch(action);
    socket?.emit("action", action);
  };

  return {
    state,
    dispatch,
    sendMessage,
  };
};

export default useRoom;
