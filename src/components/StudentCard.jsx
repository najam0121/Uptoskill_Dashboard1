import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, MapPin, Calendar, ExternalLink, Mail } from "lucide-react";
import { useRef, useState } from "react";

/* --------- Utility for badge colours by skill level -------- */
const skillLevelColors = {
  Beginner: "bg-warning text-warning-foreground",
  Intermediate: "bg-primary text-primary-foreground",
  Advanced: "bg-success text-success-foreground",
};

export default function StudentCard({
  student,
  onViewProfile,
  onContact,
  delay = 0,
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();

    // Smooth interpolation for spotlight position
    setPosition((prev) => ({
      x: prev.x + (e.clientX - rect.left - prev.x) * 0.2,
      y: prev.y + (e.clientY - rect.top - prev.y) * 0.2,
    }));
  };

  // Generate email id 
  const generateEmail = (name) => {
    return name.toLowerCase().replace(/\s+/g, ".") + "@gmail.com";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <Card
        ref={divRef}
        className="relative p-6 h-full flex flex-col hover:shadow-elegant transition-all duration-300 overflow-hidden"
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
          {/* Header: avatar, name, domain, rating */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground truncate">
                {student.name}
              </h3>
              <p className="text-muted-foreground text-sm">{student.domain}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium">{student.rating}</span>
              </div>
            </div>
          </div>

          {/* Skill level, experience, location, last active, badges */}
          <div className="space-y-3 mb-4 flex-1">
            <div className="flex items-center gap-2">
              <Badge className={skillLevelColors[student.skillLevel]}>
                {student.skillLevel}
              </Badge>
              <Badge variant="outline">{student.experience}</Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{student.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last active: {student.lastActive}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {student.badges.slice(0, 3).map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
              {student.badges.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{student.badges.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setShowProfile(true)}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Profile
            </Button>
            <Button
              size="sm"
              className="btn-primary flex-1"
              onClick={() => setShowContact(true)}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>
      </Card>

      {/* Contact */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              Contact {student.name}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Rating:</strong> {student.rating}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Email:</strong> {generateEmail(student.name)}
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              rows="4"
              placeholder="Type your message here..."
            ></textarea>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowContact(false)}>
                Close
              </Button>
              <Button
                className="btn-primary"
                onClick={() => {
                  alert("Message sent successfully!");
                  setShowContact(false);
                }}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Profile */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[28rem]">
            <h2 className="text-xl font-semibold mb-4">
              {student.name}'s Profile
            </h2>
            <p className="mb-2">
              <strong>Domain:</strong> {student.domain}
            </p>
            <p className="mb-2">
              <strong>Experience:</strong> {student.experience}
            </p>
            <p className="mb-2">
              <strong>Skill Level:</strong> {student.skillLevel}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {student.location}
            </p>
            <p className="mb-2">
              <strong>Last Active:</strong> {student.lastActive}
            </p>
            <p className="mb-2">
              <strong>Rating:</strong> {student.rating}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {generateEmail(student.name)}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {student.badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowProfile(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
