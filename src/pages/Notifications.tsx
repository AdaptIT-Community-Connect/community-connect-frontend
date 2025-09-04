import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Bell, 
  MessageCircle, 
  Heart, 
  UserPlus, 
  Calendar,
  CheckCircle,
  X,
  MoreVertical
} from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah Johnson',
      description: 'Thanks for helping with the garden project!',
      timestamp: '2 minutes ago',
      read: false,
      avatar: '/placeholder.svg',
      actionUrl: '/chat/1'
    },
    {
      id: 2,
      type: 'job_match',
      title: 'New job opportunity matches your skills',
      description: 'Math tutoring position in Sandton - R150/hour',
      timestamp: '1 hour ago',
      read: false,
      avatar: '/placeholder.svg',
      actionUrl: '/job/2'
    },
    {
      id: 3,
      type: 'application',
      title: 'Application accepted!',
      description: 'You\'ve been selected for the community garden helper position',
      timestamp: '3 hours ago',
      read: true,
      avatar: '/placeholder.svg',
      actionUrl: '/job/1'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Upcoming volunteer session',
      description: 'Food distribution starts in 2 hours at Alexandra Township',
      timestamp: '5 hours ago',
      read: false,
      avatar: '/placeholder.svg',
      actionUrl: '/job/6'
    },
    {
      id: 5,
      type: 'follow',
      title: 'Mike Chen started following you',
      description: 'Connect with Mike to discover more opportunities',
      timestamp: '1 day ago',
      read: true,
      avatar: '/placeholder.svg',
      actionUrl: '/profile'
    },
    {
      id: 6,
      type: 'like',
      title: 'Someone liked your profile',
      description: 'Your tutoring skills caught someone\'s attention',
      timestamp: '2 days ago',
      read: true,
      avatar: '/placeholder.svg',
      actionUrl: '/profile'
    },
    {
      id: 7,
      type: 'system',
      title: 'Profile completion reminder',
      description: 'Complete your profile to get better job matches',
      timestamp: '3 days ago',
      read: true,
      avatar: '/placeholder.svg',
      actionUrl: '/profile'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-4 w-4" />;
      case 'job_match':
      case 'application':
        return <Bell className="h-4 w-4" />;
      case 'reminder':
        return <Calendar className="h-4 w-4" />;
      case 'follow':
        return <UserPlus className="h-4 w-4" />;
      case 'like':
        return <Heart className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'text-blue-500 bg-blue-500/10';
      case 'job_match':
        return 'text-green-500 bg-green-500/10';
      case 'application':
        return 'text-primary bg-primary/10';
      case 'reminder':
        return 'text-orange-500 bg-orange-500/10';
      case 'follow':
        return 'text-purple-500 bg-purple-500/10';
      case 'like':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'jobs') return ['job_match', 'application', 'reminder'].includes(notification.type);
    if (activeTab === 'social') return ['message', 'follow', 'like'].includes(notification.type);
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    // In real app, this would update the backend
    console.log('Marking notification as read:', id);
  };

  const markAllAsRead = () => {
    // In real app, this would update all notifications in backend
    console.log('Marking all notifications as read');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="p-2 h-auto"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="sm" className="p-2 h-auto">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-4 w-4 rounded-full p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-2">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`cursor-pointer hover:bg-accent/50 transition-colors animate-fade-in ${
                    !notification.read ? 'border-primary/20 bg-primary/5' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    navigate(notification.actionUrl);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Notification Icon */}
                      <div className={`p-2 rounded-lg flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Notification Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className={`font-medium text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!notification.read && (
                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle dismiss notification
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <div className="mx-auto h-24 w-24 bg-muted rounded-full flex items-center justify-center">
                      <Bell className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === 'all' 
                      ? "You're all caught up!" 
                      : `No ${activeTab} notifications found`}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Notifications;