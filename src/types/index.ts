export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing?: boolean;
  isVerified?: boolean;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  timestamp: Date;
  isViewed: boolean;
}

export interface Post {
  id: string;
  user: User;
  images: string[];
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: Date;
  isLiked: boolean;
  isSaved: boolean;
  location?: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

export interface Reel {
  id: string;
  user: User;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  audioName: string;
  isLiked: boolean;
}

export interface Message {
  id: string;
  sender: User;
  text?: string;
  imageUrl?: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: Message;
  unreadCount: number;
}
