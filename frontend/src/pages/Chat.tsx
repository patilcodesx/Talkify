import { useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import ChatWindow from "@/components/chat/ChatWindow";
import { currentUser, chats } from "@/data/mockData";
import { Chat as ChatType } from "@/types/chat";

export default function Chat() {
  const [activeChat, setActiveChat] = useState<ChatType | null>(
    chats[0] ?? null
  );

  return (
    <AppLayout
      currentUser={currentUser}
      chats={chats}
      activeChat={activeChat}
      onSelectChat={setActiveChat}
    >
      <ChatWindow chat={activeChat} />
    </AppLayout>
  );
}
