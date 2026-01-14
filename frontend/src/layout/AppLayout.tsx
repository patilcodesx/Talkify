import { ReactNode } from "react";
import Sidebar from "@/components/chat/Sidebar";
import { Chat, User } from "@/types/chat";

interface Props {
  children: ReactNode;
  currentUser: User;
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

export default function AppLayout({
  children,
  currentUser,
  chats,
  activeChat,
  onSelectChat,
}: Props) {
  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <Sidebar
        currentUser={currentUser}
        chats={chats}
        activeChat={activeChat}
        onSelectChat={onSelectChat}
      />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
