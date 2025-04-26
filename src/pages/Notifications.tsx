
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCheck, Bell } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New approval request",
      message: "You have a new room booking approval request pending",
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: "2",
      title: "Request approved",
      message: "Your equipment request has been approved by Finance department",
      date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: false,
    },
    {
      id: "3",
      title: "Request rejected",
      message: "Your event hosting request has been rejected by Facilities",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    {
      id: "4",
      title: "System maintenance",
      message: "CampusFlow will be under maintenance this weekend",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
    },
  ]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    } else {
      return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications(
      notifications.map(n => 
        n.id === id ? { ...n, read: !n.read } : n
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-campus-teal text-white text-xs rounded-full px-2 py-1">
              {unreadCount} new
            </span>
          )}
        </div>
        
        <Button 
          variant="outline" 
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>
      
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 cursor-pointer transition-colors ${
                notification.read ? "" : "border-l-4 border-l-campus-teal bg-blue-50"
              }`}
              onClick={() => toggleRead(notification.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Bell className={`h-4 w-4 ${notification.read ? "text-gray-400" : "text-campus-teal"}`} />
                    <h3 className="font-medium">{notification.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(notification.date)}
                </span>
              </div>
            </Card>
          ))
        ) : (
          <div className="p-8 text-center border rounded-lg">
            <Bell className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium">No notifications</h3>
            <p className="text-sm text-gray-500 mt-1">
              You're all caught up! You don't have any notifications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
