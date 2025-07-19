import { motion } from 'framer-motion';
import { Bell, Settings, User, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-lg border-b border-border shadow-xl transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ WebkitBackdropFilter: "blur(16px)" }}
    >
      <div className="flex items-center justify-between px-6 py-4 pb-1">
        {/* Logo */}
       <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-15 h-9 rounded-xl flex items-center justify-center relative  ">
            <img
              src="/src/assets/uptoskills_logo.png"
              alt="UptoSkill Logo"
              className="object-contain w-25 h-25 "
            />
          </div>
          {/* <span className="text-2xl font-bold bg-gradient-to-r from-[#FF824C] to-[#01BDA5] bg-clip-text text-transparent">
            UptoSkill
          </span> */}
        </motion.div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center max-w-md w-full mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search students, skills, domains..." 
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 relative z-10 " />
              <span className="absolute -top-0 -right-0 w-3 h-3 bg-secondary rounded-full flex items-center justify-center z-20 ">
                <span className="w-1.5 h-1.5 bg-secondary-foreground rounded-full"></span>
              </span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}