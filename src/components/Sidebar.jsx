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
  { id: "badges", label: "Verified Badges", icon: Award },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Sidebar({ isOpen, setIsOpen, onSearchClick , onInterviewsClick, onSectionChange}) {
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
  if (onSectionChange) onSectionChange(item.id);
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

                  {/* Active indicator – left side */}
                  {activeItem === item.id && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-white rounded-r-full"
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        duration: 0.2,
                      }}
                    />
                  )}

                  {/* Right-side rounded end coverage for active item */}
                  {activeItem === item.id && (
                    <motion.div
                      className="absolute right-0 top-0 bottom-0 w-8 bg-white/20 rounded-l-full backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.3,
                      }}
                    />
                  )}

                  {/* Bold white rounded shape at the end */}
                  {activeItem === item.id && (
                    <motion.div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white/30 rounded-full border-2 border-white/40 backdrop-blur-md"
                      initial={{ opacity: 0, x: 10, scale: 0 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                        delay: 0.1,
                        duration: 0.4,
                      }}
                    >
                      {/* Inner dot for extra emphasis */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 600,
                          damping: 15,
                        }}
                      />
                    </motion.div>
                  )}

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

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground font-semibold">
                  HR
                </span>
              </div>
              <div>
                <p className="text-sidebar-foreground font-medium">
                  HR Manager
                </p>
                <p className="text-sidebar-foreground/70 text-sm">
                  TechCorp Inc.
                </p>
              </div>
            </div>

            {/* Logout Button */}

            <motion.button
              className=" sidebar-item w-full text-red-400 hover:bg-red-500/10 flex items-center gap-3 p-2 rounded-lg"
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
