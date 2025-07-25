import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    domain: string;
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    badges: string[];
    location: string;
    experience: string;  
    rating: number; 
    profileImage?: string;
    lastActive: string;
  };
  onViewProfile: (studentId: string) => void;
  onContact: (studentId: string) => void;
  delay?: number;
}

const skillLevelColors = {
  Beginner: 'bg-warning text-warning-foreground',
  Intermediate: 'bg-primary text-primary-foreground',
  Advanced: 'bg-success text-success-foreground',
};

export default function StudentCard({ student, onViewProfile, onContact, delay = 0 }: StudentCardProps) { 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <Card
  className="p-6 h-full flex flex-col border-2 border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_20px_4px_rgba(59,130,246,0.5)]"
  style={{
    borderStyle: 'solid',
    borderRadius: 0,
  }}
  onMouseEnter={e => {
    e.currentTarget.style.borderTopColor = '#F97316';
    e.currentTarget.style.borderLeftColor = '#F97316';
    e.currentTarget.style.borderBottomColor = '#3B82F6';
    e.currentTarget.style.borderRightColor = '#3B82F6';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.borderTopColor = 'transparent';
    e.currentTarget.style.borderLeftColor = 'transparent';
    e.currentTarget.style.borderBottomColor = 'transparent';
    e.currentTarget.style.borderRightColor = 'transparent';
  }}
>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">{student.name}</h3>
            <p className="text-muted-foreground text-sm">{student.domain}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{student.rating}</span>
            </div>
          </div>
        </div>

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

        <div className="flex gap-2 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewProfile(student.id)}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Profile
          </Button>
          <Button 
            size="sm" 
            className="btn-primary flex-1"
            onClick={() => onContact(student.id)}
          >
            Contact
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}