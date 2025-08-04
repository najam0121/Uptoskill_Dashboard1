import { motion } from "framer-motion";
import { useRef, useState } from "react";

const colorClasses = {
  primary: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
  secondary: "bg-gradient-to-br from-purple-500 to-purple-600 text-white",
  success: "bg-gradient-to-br from-green-500 to-green-600 text-white",
  warning: "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "primary",
  delay = 0,
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={divRef}
      className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${colorClasses[color]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(0.6)}
      onMouseLeave={() => setOpacity(0)}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.1), transparent 40%)`,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          {Icon && <Icon className="w-5 h-5 opacity-80" />}
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {subtitle && (
          <p className="text-sm opacity-75">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}


