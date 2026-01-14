export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  mediaUrl?: string;
  fileName?: string;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name: string;
  avatar: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isTyping?: boolean;
  typingUser?: string;
}

export interface GroupChat extends Chat {
  type: 'group';
  admins: string[];
  description?: string;
}
