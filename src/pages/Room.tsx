import type { Action, IRoom } from "../typings";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useUser } from "../lib/useUser";
import Video from "../components/Video";
import Header from "../components/Header";
import { Avatar, Loading } from "@nextui-org/react";
import Center from "../components/Center";

const reducer = (state: IRoom, action: Action): IRoom => {
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
      return action.payload;
    default:
      return state;
  }
};

const Room = () => {
  const initialState: IRoom = {
    id: "",
    users: [],
    messages: [],
    video: undefined,
    ownerId: "",
    loading: true,
  };

  const user = useUser();
  const { roomId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      socket.emit("join", { roomId, user });
      socket.on("action", dispatch);
    });

    return () => {
      socket.close();
    };
  }, [roomId, user]);

  if (state.loading) {
    return (
      <Center>
        <Loading />;
      </Center>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {state.users.map((user) => (
        <Avatar src={user.avatar}></Avatar>
      ))}
      <Header />
      <Video url={""} time={0} paused={false} />
    </div>
  );
};

export default Room;
