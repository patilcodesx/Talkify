import { useState, useRef, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Smile, Paperclip, Send, Mic, Image, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface MessageInputProps {
  onSend: (content: string, type?: 'text' | 'image') => void;
  disabled?: boolean;
}

const emojis = ['😀', '😂', '😍', '🥰', '😎', '🤔', '👍', '❤️', '🎉', '🔥', '✨', '💯', '🙌', '👏', '😊', '🥳', '💪', '🤩', '😇', '🤗'];

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || selectedImage) {
      if (selectedImage) {
        onSend(message.trim() || 'Sent an image', 'image');
      } else {
        onSend(message.trim(), 'text');
      }
      setMessage('');
      setSelectedImage(null);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setIsEmojiOpen(false);
    inputRef.current?.focus();
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border-t border-border bg-card p-3">
      {selectedImage && (
        <div className="mb-3 relative inline-block">
          <img
            src={selectedImage}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="flex items-center gap-1">
          <Popover open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-64 p-2"
              side="top"
              align="start"
            >
              <div className="grid grid-cols-5 gap-1">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addEmoji(emoji)}
                    className="text-xl p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={handleFileSelect}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={disabled}
            rows={1}
            className={cn(
              'w-full resize-none bg-secondary rounded-2xl px-4 py-2.5 text-sm',
              'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20',
              'min-h-[40px] max-h-[120px]',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            style={{
              height: 'auto',
              overflow: 'hidden',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
            }}
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={disabled || (!message.trim() && !selectedImage)}
          size="icon"
          className={cn(
            'h-10 w-10 rounded-full gradient-primary shadow-glow',
            'transition-all duration-200 hover:scale-105',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          )}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
