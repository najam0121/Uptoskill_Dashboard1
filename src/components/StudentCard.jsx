import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, ExternalLink } from "lucide-react";

const skillLevelColors = {
  Beginner: "bg-yellow-100 text-yellow-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-green-100 text-green-800",
};

export default function StudentCard({ 
  student,
  onViewProfile,
  onContact,
  delay = 0,
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-600">{student.domain}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{student.rating}</span>
        </div>
      </div>

      {/* Skill Level */}
      <div className="mb-3">
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${skillLevelColors[student.skillLevel]}`}>
          {student.skillLevel}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          {student.experience}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          {student.location}
        </div>
        <div className="text-sm text-gray-600">
          Last active: {student.lastActive}
        </div>
      </div>

      {/* Badges */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {student.badges.slice(0, 3).map((badge, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {badge}
            </span>
          ))}
          {student.badges.length > 3 && (
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              +{student.badges.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onViewProfile(student.id)}
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          View Profile
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={() => onContact(student.id)}
        >
          Contact
        </Button>
      </div>
    </motion.div>
  );
}
