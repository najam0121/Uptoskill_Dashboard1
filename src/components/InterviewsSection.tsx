import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Phone, MoreHorizontal } from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
}

const mockInterviews: Interview[] = [
  {
    id: '1',
    candidateName: 'Sarah Johnson',
    position: 'React Developer',
    date: '2024-07-20',
    time: '10:00 AM',
    type: 'video',
    status: 'scheduled'
  },
  {
    id: '2',
    candidateName: 'Mike Chen',
    position: 'Data Scientist',
    date: '2024-07-20',
    time: '2:00 PM',
    type: 'video',
    status: 'scheduled'
  },
  {
    id: '3',
    candidateName: 'Emily Rodriguez',
    position: 'UI/UX Designer',
    date: '2024-07-21',
    time: '11:30 AM',
    type: 'phone',
    status: 'scheduled'
  }
];

const statusColors = {
  scheduled: 'bg-primary text-primary-foreground',
  completed: 'bg-success text-success-foreground',
  cancelled: 'bg-destructive text-destructive-foreground'
};

const typeIcons = {
  video: Video,
  phone: Phone,
  'in-person': Calendar
};

export default function InterviewsSection() {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Upcoming Interviews</h2>
        <Button className="btn-primary">
          Schedule New Interview
        </Button>
      </div>

      <div className="grid gap-4">
        {mockInterviews.map((interview, index) => {
          const TypeIcon = typeIcons[interview.type];
          
          return (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {interview.candidateName.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground">{interview.candidateName}</h3>
                      <p className="text-muted-foreground text-sm">{interview.position}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(interview.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{interview.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <TypeIcon className="w-5 h-5 text-primary" />
                      <Badge className={statusColors[interview.status]}>
                        {interview.status}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}