import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageBubble, type Message } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { type Contact } from "./ContactList";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  contact: Contact;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onBack?: () => void;
  className?: string;
}

export function ChatInterface({ 
  contact, 
  messages, 
  onSendMessage, 
  onBack, 
  className 
}: ChatInterfaceProps) {
  return (
    <div className={cn("flex flex-col h-full bg-chat-background", className)}>
      {/* Chat Header */}
      <div className="flex items-center p-4 bg-card border-b">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="relative mr-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {contact.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {contact.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-chat-online-indicator rounded-full border-2 border-card"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-medium text-foreground truncate">{contact.name}</h2>
          <p className="text-sm text-muted-foreground">
            {contact.online ? "Online" : "Last seen recently"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Start a conversation with {contact.name}</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}