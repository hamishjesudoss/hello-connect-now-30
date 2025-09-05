import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onContactSelect: (contact: Contact) => void;
}

export function ContactList({ contacts, selectedContactId, onContactSelect }: ContactListProps) {
  return (
    <div className="w-full max-w-md bg-card border-r">
      <div className="p-4 border-b bg-primary">
        <h1 className="text-xl font-semibold text-primary-foreground">hello</h1>
      </div>
      <div className="overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={cn(
              "flex items-center p-4 hover:bg-muted cursor-pointer transition-colors border-b border-border/50",
              selectedContactId === contact.id && "bg-muted"
            )}
            onClick={() => onContactSelect(contact)}
          >
            <div className="relative mr-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {contact.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-chat-online-indicator rounded-full border-2 border-card"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
                <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                {contact.unreadCount > 0 && (
                  <Badge variant="default" className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground">
                    {contact.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}