export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface IMessage {
  authorId: string;
  content: string;
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
  messages: IMessage[];
  ownerId: string;
  video: IVideo;
}

export interface IRoomState extends IRoom {
  loading: boolean;
  error?: string;
}

export type Action =
  | {
      type: "add-user" | "remove-user";
      payload: User;
    }
  | {
      type: "add-message";
      payload: IMessage;
    }
  | {
      type: "set-video";
      payload: IVideo;
    }
  | {
      type: "room";
      payload: IRoom;
    }
  | {
      type: "cmd";
      payload: string;
    };

export type Language = "ENG" | "FRE" | "GEO" | "JPN" | "RUS";
export type Type = "movie" | "series";

export interface SearchResult {
  id: number;
  type: Type;
  name: string;
  poster: string;
  languages: Language[];
  imdb: number;
  year: number;
}
