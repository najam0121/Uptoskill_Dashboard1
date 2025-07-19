import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Search, 
  Calendar, 
  FileText, 
  Bell, 
  LogOut,
  Users,
  Award
} from 'lucide-react';
import { useState } from 'react';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { id: 'search', label: 'Search Students', icon: Search },
  { id: 'interviews', label: 'Interviews', icon: Calendar },
  { id: 'assessments', label: 'Assessments', icon: FileText },
  { id: 'mentorship', label: 'Mentorship', icon: Users },
  { id: 'badges', label: 'Verified Badges', icon: Award },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <motion.aside 
      className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r border-sidebar-border shadow-lg"
      initial={{ x: -264 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col h-full">
        {/* Navigation Items */}
        <nav className="flex-1 pt-6 px-4">
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`sidebar-item w-full ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => setActiveItem(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground font-semibold">HR</span>
            </div>
            <div>
              <p className="text-sidebar-foreground font-medium">HR Manager</p>
              <p className="text-sidebar-foreground/70 text-sm">TechCorp Inc.</p>
            </div>
          </div>
          
          <motion.button
            className="sidebar-item w-full text-red-400 hover:bg-red-500/10"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}