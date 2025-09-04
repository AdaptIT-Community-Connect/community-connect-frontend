import React from 'react';
import Header from '../components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const navigate = useNavigate();

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Skonie",
      lastMessage: "Hambaaaa namadolo wescoboshelo",
      timestamp: "2 min ago",
      unread: 2,
      avatar: "/placeholder.svg",
      online: true
    },
    {
      id: 2,
      name: "Naledi",
      lastMessage: "Are you available for the tutoring session tomorrow?",
      timestamp: "1 hour ago",
      unread: 0,
      avatar: "/placeholder.svg",
      online: false
    },
    {
      id: 3,
      name: "Community Center",
      lastMessage: "New volunteer opportunities available",
      timestamp: "3 hours ago",
      unread: 1,
      avatar: "/placeholder.svg",
      online: false
    },
    {
      id: 4,
      name: "Emma Davis",
      lastMessage: "The dog walking went great today 🐕",
      timestamp: "Yesterday",
      unread: 0,
      avatar: "/placeholder.svg",
      online: true
    },
    {
      id: 5,
      name: "Local Library",
      lastMessage: "Reminder: Book club meeting this Friday",
      timestamp: "2 days ago",
      unread: 0,
      avatar: "/placeholder.svg",
      online: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-20">
        {/* Search Header */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <Card 
              key={conversation.id}
              className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => navigate(`/chat/${conversation.id}`)}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full"></div>
                  )}
                </div>

                {/* Conversation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground truncate">
                      {conversation.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State (if no conversations) */}
        {conversations.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="mx-auto h-24 w-24 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground">
              Start connecting with your community members
            </p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Messages;