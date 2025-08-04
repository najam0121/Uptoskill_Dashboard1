import { motion } from 'framer-motion';
import { Users, Target, Briefcase } from 'lucide-react';

export default function HiringAnimation3D() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Central Hub */}
      <motion.div
        className="absolute w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Target className="w-8 h-8 text-white" />
      </motion.div>

      {/* Orbiting Elements */}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="absolute w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-md"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: `${80 + index * 20}px center`,
          }}
        >
          {index % 2 === 0 ? (
            <Users className="w-6 h-6 text-white" />
          ) : (
            <Briefcase className="w-6 h-6 text-white" />
          )}
        </motion.div>
      ))}

      {/* Floating Text */}
      <motion.div
        className="absolute top-4 left-4 text-white font-bold text-lg"
        animate={{
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        HIRE
      </motion.div>

      <motion.div
        className="absolute bottom-4 right-4 text-white font-bold text-lg"
        animate={{
          y: [0, 10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        TALENT
      </motion.div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl" />
    </div>
  );
}

