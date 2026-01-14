import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat as ChatType } from '@/types/chat';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { currentUser, chats } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Chat() {
  const [activeChat, setActiveChat] = useState<ChatType | null>(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const navigate = useNavigate();

  const handleSelectChat = (chat: ChatType) => {
    setActiveChat(chat);
    setShowChatWindow(true);
  };

  const handleBack = () => {
    setShowChatWindow(false);
  };

  const handleNavigateToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        currentUser={currentUser}
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onNavigateToSettings={handleNavigateToSettings}
        className={cn(
          'transition-transform duration-300 ease-in-out',
          'md:relative md:translate-x-0',
          showChatWindow && 'absolute -translate-x-full md:translate-x-0'
        )}
      />

      {/* Chat Window */}
      <div
        className={cn(
          'flex-1 transition-transform duration-300 ease-in-out',
          'absolute inset-0 md:relative',
          !showChatWindow && 'translate-x-full md:translate-x-0'
        )}
      >
        <ChatWindow
          chat={activeChat}
          onBack={handleBack}
          showBackButton={showChatWindow}
        />
      </div>
    </div>
  );
}
