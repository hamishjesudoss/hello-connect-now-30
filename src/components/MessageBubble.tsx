import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={cn(
      "flex mb-3",
      message.isSent ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[70%] px-4 py-2 rounded-lg text-sm",
        message.isSent 
          ? "bg-chat-message-sent text-chat-message-sent-foreground rounded-br-sm" 
          : "bg-chat-message-received text-chat-message-received-foreground rounded-bl-sm"
      )}>
        <p className="break-words">{message.text}</p>
        <div className={cn(
          "flex items-center gap-1 mt-1 text-xs opacity-70",
          message.isSent ? "justify-end" : "justify-start"
        )}>
          <span>{message.timestamp}</span>
          {message.isSent && (
            <div className="flex">
              {message.isDelivered && (
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              )}
              {message.isRead && (
                <svg className="w-4 h-4 -ml-2" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}