import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Award,
  MessageSquare,
  Calendar,
  User,
  Settings,
  Clock,
  X,
  MoreHorizontal
} from "lucide-react";
import { useRef, useState } from "react";

/* --------- Sample Notification Data -------- */
const sampleNotifications = [
  {
    id: "NOT-001",
    title: "Badge Verification Complete",
    message: "Your 'Advanced React Developer' badge has been successfully verified and is now available in your profile.",
    type: "success",
    category: "badge",
    timestamp: "2 minutes ago",
    isRead: false,
    priority: "high",
    actionRequired: false,
    relatedUser: "Tech Academy Pro",
    metadata: {
      badgeId: "BDG-2024-001",
      badgeTitle: "Advanced React Developer"
    }
  },
  {
    id: "NOT-002",
    title: "New Message Received",
    message: "Sarah Johnson sent you a message regarding the Data Science collaboration project.",
    type: "info",
    category: "message",
    timestamp: "15 minutes ago",
    isRead: false,
    priority: "medium",
    actionRequired: true,
    relatedUser: "Sarah Johnson",
    metadata: {
      messageId: "MSG-456",
      projectName: "Data Science Collaboration"
    }
  },
  {
    id: "NOT-003",
    title: "Badge Expiry Warning",
    message: "Your 'Cloud Architecture Mastery' badge will expire in 30 days. Renew now to maintain your certification.",
    type: "warning",
    category: "badge",
    timestamp: "1 hour ago",
    isRead: true,
    priority: "high",
    actionRequired: true,
    relatedUser: "AWS Academy",
    metadata: {
      badgeId: "BDG-2024-004",
      expiryDate: "January 5, 2025"
    }
  },
  {
    id: "NOT-004",
    title: "Profile View Notification",
    message: "Mike Chen viewed your profile and is interested in your UI/UX design work.",
    type: "info",
    category: "profile",
    timestamp: "3 hours ago",
    isRead: true,
    priority: "low",
    actionRequired: false,
    relatedUser: "Mike Chen",
    metadata: {
      viewerProfile: "mike-chen-designer"
    }
  },
  {
    id: "NOT-005",
    title: "System Maintenance Alert",
    message: "Scheduled maintenance will occur on August 30, 2025 from 2:00 AM to 4:00 AM IST. Some features may be temporarily unavailable.",
    type: "warning",
    category: "system",
    timestamp: "6 hours ago",
    isRead: false,
    priority: "medium",
    actionRequired: false,
    relatedUser: "System Administrator",
    metadata: {
      maintenanceStart: "August 30, 2025 2:00 AM IST",
      maintenanceEnd: "August 30, 2025 4:00 AM IST"
    }
  },
  {
    id: "NOT-006",
    title: "Badge Submission Under Review",
    message: "Your 'Innovation Leadership' badge submission is currently under review. We'll notify you once the verification process is complete.",
    type: "info",
    category: "badge",
    timestamp: "1 day ago",
    isRead: true,
    priority: "medium",
    actionRequired: false,
    relatedUser: "Business School Excellence",
    metadata: {
      badgeId: "BDG-2024-006",
      reviewStatus: "in_progress"
    }
  },
  {
    id: "NOT-007",
    title: "Security Alert",
    message: "A new device signed into your account from Chrome on Windows. If this wasn't you, please secure your account immediately.",
    type: "error",
    category: "security",
    timestamp: "2 days ago",
    isRead: false,
    priority: "high",
    actionRequired: true,
    relatedUser: "Security System",
    metadata: {
      device: "Chrome on Windows",
      location: "Mumbai, India",
      ipAddress: "192.168.1.100"
    }
  },
  {
    id: "NOT-008",
    title: "Weekly Badge Summary",
    message: "You've earned 2 new badges this week! Check out your achievements and see what badges you can earn next.",
    type: "success",
    category: "achievement",
    timestamp: "3 days ago",
    isRead: true,
    priority: "low",
    actionRequired: false,
    relatedUser: "System",
    metadata: {
      newBadges: 2,
      totalBadges: 12,
      weeklyGoal: 3
    }
  }
];

/* --------- Utility for notification type colors and icons -------- */
const notificationTypeConfig = {
  success: {
    color: "bg-success text-success-foreground",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
    icon: CheckCircle
  },
  warning: {
    color: "bg-warning text-warning-foreground",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
    icon: AlertTriangle
  },
  error: {
    color: "bg-destructive text-destructive-foreground",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    icon: AlertTriangle
  },
  info: {
    color: "bg-primary text-primary-foreground",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    icon: Info
  }
};

/* --------- Utility for notification category icons -------- */
const categoryIcons = {
  badge: Award,
  message: MessageSquare,
  profile: User,
  system: Settings,
  security: AlertTriangle,
  achievement: Award
};

/* --------- Utility for priority colors -------- */
const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-gray-100 text-gray-800 border-gray-200"
};

export function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
  onAction,
  delay = 0,
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();

    // Smooth interpolation for spotlight position
    setPosition((prev) => ({
      x: prev.x + (e.clientX - rect.left - prev.x) * 0.2,
      y: prev.y + (e.clientY - rect.top - prev.y) * 0.2,
    }));
  };

  const typeConfig = notificationTypeConfig[notification.type];
  const CategoryIcon = categoryIcons[notification.category];
  const TypeIcon = typeConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
    >
      <Card
        ref={divRef}
        className={`relative p-4 hover:shadow-elegant transition-all duration-300 overflow-hidden ${
          !notification.isRead ? 'border-l-4 border-l-primary' : ''
        }`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(0.6)}
        onMouseLeave={() => setOpacity(0)}
      >
        {/* Blue spotlight that follows the cursor */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(0,102,255,0.3), transparent 80%)`,
            transition: "background 0.1s ease-out",
          }}
        />

        {/* ---------- Card Content ---------- */}
        <div className="relative z-10">
          {/* Header: icon, title, timestamp, actions */}
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${typeConfig.bgColor}`}>
              <CategoryIcon className={`w-5 h-5 ${typeConfig.color.replace('bg-', 'text-').replace(' text-', '-foreground text-')}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className={`font-semibold text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {notification.title}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-6 h-6 p-0"
                    onClick={() => onDelete(notification.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {notification.message}
              </p>

              {/* Badges and indicators */}
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${typeConfig.color} text-xs`}>
                  <TypeIcon className="w-3 h-3 mr-1" />
                  {notification.type}
                </Badge>
                <Badge variant="outline" className={`${priorityColors[notification.priority]} text-xs`}>
                  {notification.priority}
                </Badge>
                {!notification.isRead && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                    New
                  </Badge>
                )}
              </div>

              {/* Related user info */}
              {notification.relatedUser && (
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  <span>From: {notification.relatedUser}</span>
                </div>
              )}

              {/* Metadata display */}
              {notification.metadata && (
                <div className={`${typeConfig.bgColor} ${typeConfig.borderColor} border rounded-lg p-2 mb-3`}>
                  <div className="text-xs space-y-1">
                    {Object.entries(notification.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                {!notification.isRead && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Mark as Read
                  </Button>
                )}
                {notification.actionRequired && (
                  <Button
                    size="sm"
                    className="btn-primary text-xs"
                    onClick={() => onAction(notification)}
                  >
                    Take Action
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* --------- Main Notification Page Component -------- */
export default function NotificationPage() {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [filter, setFilter] = useState('all'); // all, unread, read

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleDelete = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const handleAction = (notification) => {
    console.log("Taking action for notification:", notification.id);
    // Implement specific action logic based on notification type/category
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.isRead;
    if (filter === 'read') return notif.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="container mx-auto p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Bell className="w-8 h-8" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">
              Stay updated with your latest activities and system updates.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {['all', 'unread', 'read'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType}
              {filterType === 'unread' && unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
              onAction={handleAction}
              delay={index * 0.05}
            />
          ))
        ) : (
          <Card className="p-8 text-center">
            <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
            <p className="text-muted-foreground">
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications." 
                : filter === 'read' 
                ? "No read notifications to display."
                : "You don't have any notifications yet."}
            </p>
          </Card>
        )}
      </div>

      {/* Statistics Summary */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {notifications.length}
          </div>
          <div className="text-sm text-muted-foreground">Total Notifications</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {unreadCount}
          </div>
          <div className="text-sm text-muted-foreground">Unread</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {notifications.filter(n => n.actionRequired).length}
          </div>
          <div className="text-sm text-muted-foreground">Action Required</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {notifications.filter(n => n.priority === 'high').length}
          </div>
          <div className="text-sm text-muted-foreground">High Priority</div>
        </Card>
      </div>
    </div>
  );
}
