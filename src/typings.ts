export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  content: string;
  authorId: string;
  author: User;
}

export interface IVideo {
  url: string;
  time: number;
  paused: boolean;
}
export interface IRoom {
  id: string;
  users: User[];
  messages: Message[];
  ownerId: string;
  video?: IVideo;
  loading: boolean;
}

export type Action =
  | {
      type: "add-user" | "remove-user";
      payload: User;
    }
  | {
      type: "add-message";
      payload: Message;
    }
  | {
      type: "set-video";
      payload: IVideo;
    }
  | {
      type: "room";
      payload: IRoom;
    };
