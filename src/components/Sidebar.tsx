import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  Calendar,
  FileText,
  Bell,
  LogOut,
  Users,
  Award,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "search", label: "Search Students", icon: Search },
  { id: "interviews", label: "Interviews", icon: Calendar },
  { id: "assessments", label: "Assessments", icon: FileText },
  { id: "mentorship", label: "Mentorship", icon: Users },
  { id: "badges", label: "Verified Badges", icon: Award },
  { id: "notifications", label: "Notifications", icon: Bell },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setIsOpen(true);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [setIsOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Menu Button when Sidebar is closed */}
      {!isOpen && !isDesktop && (
        <button
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
          onClick={toggleSidebar}
          aria-label="Open Sidebar"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Background overlay for mobile */}
      <AnimatePresence>
        {!isDesktop && isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.aside
        className="fixed top-0 left-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border shadow-lg z-50 transition-transform duration-300 ease-in-out"
        initial={{ x: -264 }}
        animate={{ x: isOpen ? 0 : -264 }}
      >
        {/* Close Button (Mobile only) */}
        <AnimatePresence>
          {isOpen && !isDesktop && (
            <motion.button
              key="close-btn"
              className="absolute top-4 right-4 z-50 p-2 text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
              aria-label="Close Sidebar"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="flex flex-col h-full pt-16">
          {/* Navigation Items */}
          <nav className="flex-1 pt-6 px-4">
            <div className="space-y-2">
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`sidebar-item w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeItem === item.id ? "bg-primary text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveItem(item.id);
                    if (!isDesktop) setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground font-semibold">
                  HR
                </span>
              </div>
              <div>
                <p className="text-sidebar-foreground font-medium">HR Manager</p>
                <p className="text-sidebar-foreground/70 text-sm">
                  TechCorp Inc.
                </p>
              </div>
            </div>

            <motion.button
              className="sidebar-item w-full text-red-400 hover:bg-red-500/10 flex items-center gap-3 p-2 rounded-lg"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
