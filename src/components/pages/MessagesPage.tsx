import { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { mockConversations, mockMessages } from '../../lib/mockData';

interface MessagesPageProps {
  onNavigate: (page: string) => void;
}

export function MessagesPage({ onNavigate }: MessagesPageProps) {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const messages = mockMessages[selectedConversation.id] || [];

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message
      setMessageText('');
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-secondary">
      <div className="mx-auto flex h-full max-w-[1366px] px-20">
        {/* Conversations List */}
        <div className="w-[320px] border-r border-border bg-white">
          <div className="border-b border-border p-4">
            <h2 className="mb-4 font-semibold">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-secondary/50 ${
                  selectedConversation.id === conversation.id ? 'bg-secondary' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  {conversation.unread > 0 && (
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {conversation.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex flex-1 flex-col bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedConversation.avatar}
                alt={selectedConversation.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{selectedConversation.name}</h3>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100% - 144px)' }}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[60%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <Input
                type="text"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary/90"
                disabled={!messageText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Session Info Panel (Optional) */}
        <div className="w-[280px] border-l border-border bg-white p-6">
          <h3 className="mb-4 font-semibold">Session Info</h3>
          
          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <div className="mb-2 text-sm text-muted-foreground">Next Session</div>
              <div className="font-medium">Nov 26, 2025</div>
              <div className="text-sm text-muted-foreground">2:00 PM</div>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                onClick={() => onNavigate('calendar')}
              >
                View in Calendar
              </Button>
            </div>

            <div className="rounded-lg border border-border p-4">
              <div className="mb-2 text-sm text-muted-foreground">Total Sessions</div>
              <div className="font-semibold">5 completed</div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => onNavigate('booking', { tutorId: '1' })}
            >
              Book Another Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
