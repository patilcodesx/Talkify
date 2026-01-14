import { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '@/types/chat';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { DateSeparator } from './DateSeparator';
import { TypingIndicator } from './TypingIndicator';
import { MessageInput } from './MessageInput';
import { messages as mockMessages, users } from '@/data/mockData';
import { isToday, isSameDay } from 'date-fns';
import { MessageSquare } from 'lucide-react';

interface ChatWindowProps {
  chat: Chat | null;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function ChatWindow({ chat, onBack, showBackButton }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chat) {
      setMessages(mockMessages[chat.id] || []);
    }
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content: string, type: 'text' | 'image' = 'text') => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      senderId: 'current-user',
      timestamp: new Date(),
      status: 'sent',
      type,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: 'delivered' } : m
        )
      );
    }, 1000);

    // Simulate message read
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: 'read' } : m
        )
      );
    }, 2000);
  };

  const getSenderInfo = (senderId: string) => {
    if (senderId === 'current-user') return null;
    const user = users.find((u) => u.id === senderId);
    return user ? { name: user.name, avatar: user.avatar } : null;
  };

  const shouldShowDateSeparator = (index: number) => {
    if (index === 0) return true;
    const currentDate = messages[index].timestamp;
    const prevDate = messages[index - 1].timestamp;
    return !isSameDay(currentDate, prevDate);
  };

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background chat-pattern">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Welcome to Talkify
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Select a conversation from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background chat-pattern">
      <ChatHeader
        chat={chat}
        onBack={onBack}
        showBackButton={showBackButton}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {messages.map((message, index) => {
            const isOwn = message.senderId === 'current-user';
            const senderInfo = getSenderInfo(message.senderId);
            const showAvatar =
              chat.type === 'group' &&
              !isOwn &&
              (index === 0 || messages[index - 1].senderId !== message.senderId);

            return (
              <div key={message.id}>
                {shouldShowDateSeparator(index) && (
                  <DateSeparator date={message.timestamp} />
                )}
                <MessageBubble
                  message={message}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  senderAvatar={senderInfo?.avatar}
                  senderName={senderInfo?.name}
                />
              </div>
            );
          })}

          {chat.isTyping && (
            <div className="flex justify-start">
              <TypingIndicator userName={chat.typingUser} />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}
