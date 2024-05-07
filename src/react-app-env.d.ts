/// <reference types="react-scripts" />

interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

interface Comm {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies?: Comm[];
  replyingTo?: string;
}
