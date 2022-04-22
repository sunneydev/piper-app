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

export type Room = {
  id: string;
  users: User[];
  messages: Message[];
  ownerId: string;
  video: {
    url: string;
    time: number;
    paused: boolean;
  };
};
