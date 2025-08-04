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

export default function Sidebar({ isOpen, setIsOpen }) {
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
        className="fixed top-0 left-0 h-full w-64 bg-sidebar shadow-2xl z-40 overflow-hidden"
        initial={{ x: -264 }}
        animate={{ x: isOpen ? 0 : -264 }}
        transition={{ duration: 0.3 }}
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
            <div className="space-y-1">
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`
                    sidebar-item w-full flex items-center gap-4 p-4 rounded-2xl 
                    transition-all duration-200 ease-out relative overflow-hidden
                    group cursor-pointer select-none
                    ${
                      activeItem === item.id
                        ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-xl shadow-primary/30"
                        : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 text-gray-700 hover:text-gray-900"
                    }
                  `}
                  onClick={() => {
                    setActiveItem(item.id);
                    if (!isDesktop) setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    x: 8,
                    scale: 1.03,
                    transition: { duration: 0.15, ease: "easeOut" },
                  }}
                  whileTap={{
                    scale: 0.97,
                    transition: { duration: 0.1, ease: "easeInOut" },
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center"
                    whileHover={{
                      rotate: activeItem === item.id ? 0 : 5,
                      scale: 1.15,
                      transition: { duration: 0.15 },
                    }}
                    whileTap={{
                      scale: 0.9,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <item.icon
                      className={`w-6 h-6 transition-all duration-200 ${
                        activeItem === item.id
                          ? "text-white drop-shadow-md"
                          : "text-gray-600 group-hover:text-primary"
                      }`}
                    />
                  </motion.div>

                  {/* Text */}
                  <motion.span
                    className={`
                      font-bold relative z-10 transition-all duration-200
                      ${
                        activeItem === item.id
                          ? "text-white drop-shadow-md tracking-wide"
                          : "text-gray-700 group-hover:text-gray-900"
                      }
                    `}
                    whileHover={{
                      x: 3,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-4">
            <motion.button
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-6 h-6" />
              <span className="font-bold">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
