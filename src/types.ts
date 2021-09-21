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

export interface RoomData {
  id: string;
  ownerId: string;
  users: User[];
  messages: Message[];
  video: VideoData;
}

export interface VideoData {
  url: string;
  time: number;
  paused: boolean;
}

export interface RoomState extends RoomData {
  [key: string]: any;
  error?: string;
  success: boolean;
}

export interface Action {
  type: "ADD" | "REMOVE" | "SET";
  property: string;
  payload: any;
}

export interface RoomResponse {
  room: RoomData;
  success: boolean;
  error?: string;
}
