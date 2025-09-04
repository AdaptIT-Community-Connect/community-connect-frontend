import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile,
  Mic
} from 'lucide-react';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // Mock chat data - in real app this would come from backend based on id
  const chatData = {
    1: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      online: true,
      lastSeen: "Online now"
    },
    2: {
      name: "Mike Chen", 
      avatar: "/placeholder.svg",
      online: false,
      lastSeen: "Last seen 1 hour ago"
    },
    3: {
      name: "Community Center",
      avatar: "/placeholder.svg", 
      online: false,
      lastSeen: "Last seen 3 hours ago"
    }
  };

  const currentChat = chatData[Number(id) as keyof typeof chatData] || chatData[1];

  // Mock messages
  const messages = [
    {
      id: 1,
      text: "Hi! I saw your post about needing help with gardening. I'd love to help!",
      sender: "them",
      timestamp: "10:30 AM",
      date: "Today"
    },
    {
      id: 2,
      text: "That's wonderful! Thank you so much. When would be a good time for you?",
      sender: "me",
      timestamp: "10:32 AM",
      date: "Today"
    },
    {
      id: 3,
      text: "I'm free this Saturday morning if that works for you?",
      sender: "them",
      timestamp: "10:35 AM",
      date: "Today"
    },
    {
      id: 4,
      text: "Perfect! Saturday morning it is. Should we meet at 9 AM?",
      sender: "me",
      timestamp: "10:36 AM",
      date: "Today"
    },
    {
      id: 5,
      text: "Sounds great! I'll bring some extra tools just in case. See you then! 🌱",
      sender: "them",
      timestamp: "10:40 AM",
      date: "Today"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In real app, this would send the message to backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/messages')}
            className="p-2 h-auto"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentChat.avatar} alt={currentChat.name} />
              <AvatarFallback>
                {currentChat.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {currentChat.online && (
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full"></div>
            )}
          </div>
          
          <div>
            <h2 className="font-semibold text-foreground">{currentChat.name}</h2>
            <p className="text-xs text-muted-foreground">{currentChat.lastSeen}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="p-2 h-auto">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 h-auto">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 h-auto">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={msg.id}>
            {/* Date separator */}
            {(index === 0 || messages[index - 1].date !== msg.date) && (
              <div className="flex justify-center my-4">
                <span className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                  {msg.date}
                </span>
              </div>
            )}
            
            {/* Message */}
            <div className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${
                msg.sender === 'me' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'
                } rounded-2xl px-4 py-2`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'me' 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                }`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t bg-background px-4 py-3">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="sm" className="p-2 h-auto flex-shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="pr-10"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-auto"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>

          {message.trim() ? (
            <Button 
              onClick={handleSendMessage}
              size="sm" 
              className="p-2 h-auto flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="p-2 h-auto flex-shrink-0">
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;