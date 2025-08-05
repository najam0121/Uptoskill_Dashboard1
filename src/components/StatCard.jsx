import { motion } from "framer-motion";
import { useRef, useState } from "react";

const colorClasses = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  delay = 0,
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition((prev) => ({
      x: prev.x + (e.clientX - rect.left - prev.x) * 0.2, // smooth interpolation
      y: prev.y + (e.clientY - rect.top - prev.y) * 0.2,
    }));
  };

  return (
    <motion.div
      ref={divRef}
      className="relative stat-card rounded-xl bg-white overflow-hidden p-4 border border-gray-200 transition-all duration-300 ease-out"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(0.6)}
      onMouseLeave={() => setOpacity(0)}
    >
      {/* 🔵 Smooth Blue Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(0,102,255,0.3), transparent 80%)`,
          transition: "background 0.1s ease-out", // smooth glow movement
        }}
      />

      {/* 📊 Card Content */}
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
