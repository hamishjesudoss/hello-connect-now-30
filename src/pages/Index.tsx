import { useState } from "react";
import { ContactList, type Contact } from "@/components/ContactList";
import { ChatInterface } from "@/components/ChatInterface";
import { type Message } from "@/components/MessageBubble";

// Mock data for demonstration
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2:34 PM",
    unreadCount: 2,
    online: true,
  },
  {
    id: "2", 
    name: "Bob Smith",
    lastMessage: "Can we meet tomorrow?",
    timestamp: "1:22 PM",
    unreadCount: 0,
    online: false,
  },
  {
    id: "3",
    name: "Carol Davis",
    lastMessage: "Thanks for your help!",
    timestamp: "12:45 PM", 
    unreadCount: 1,
    online: true,
  },
  {
    id: "4",
    name: "David Wilson",
    lastMessage: "See you later",
    timestamp: "Yesterday",
    unreadCount: 0,
    online: false,
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      text: "Hey there! How's your day going?",
      timestamp: "2:30 PM",
      isSent: false,
    },
    {
      id: "2", 
      text: "Hi Alice! It's going great, thanks for asking. How about yours?",
      timestamp: "2:32 PM",
      isSent: true,
      isDelivered: true,
      isRead: true,
    },
    {
      id: "3",
      text: "Pretty good! Just finished a big project at work 🎉",
      timestamp: "2:34 PM", 
      isSent: false,
    },
  ],
  "2": [
    {
      id: "4",
      text: "Can we meet tomorrow for lunch?",
      timestamp: "1:22 PM",
      isSent: false,
    },
  ],
  "3": [
    {
      id: "5",
      text: "Thanks for your help with the presentation!",
      timestamp: "12:45 PM",
      isSent: false,
    },
  ],
  "4": [
    {
      id: "6",
      text: "See you later!",
      timestamp: "Yesterday",
      isSent: false,
    },
    {
      id: "7",
      text: "Take care!",
      timestamp: "Yesterday", 
      isSent: true,
      isDelivered: true,
    },
  ],
};

const Index = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleSendMessage = (messageText: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isSent: true,
      isDelivered: true,
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [
        ...(prev[selectedContact.id] || []),
        newMessage,
      ],
    }));
  };

  const handleBack = () => {
    setSelectedContact(null);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Contact List - Hidden on mobile when chat is open */}
      <div className={`${selectedContact ? 'hidden md:flex' : 'flex'} w-full md:w-96`}>
        <ContactList
          contacts={mockContacts}
          selectedContactId={selectedContact?.id}
          onContactSelect={handleContactSelect}
        />
      </div>

      {/* Chat Interface - Hidden when no contact selected */}
      {selectedContact && (
        <div className={`${selectedContact ? 'flex' : 'hidden'} flex-1`}>
          <ChatInterface
            contact={selectedContact}
            messages={messages[selectedContact.id] || []}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
            className="w-full"
          />
        </div>
      )}

      {/* Welcome message when no chat selected - Desktop only */}
      {!selectedContact && (
        <div className="hidden md:flex flex-1 items-center justify-center bg-chat-background">
          <div className="text-center text-muted-foreground">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">Welcome to hello</h2>
            <p>Select a contact to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;