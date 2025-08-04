import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, Phone } from 'lucide-react';

const mockInterviews = [
  {
    id: "1",
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    date: "2024-01-15",
    time: "2:00 PM",
    type: "video",
    status: "scheduled",
  },
  {
    id: "2",
    candidateName: "Mike Chen",
    position: "Backend Developer",
    date: "2024-01-16",
    time: "10:00 AM",
    type: "phone",
    status: "scheduled",
  },
  {
    id: "3",
    candidateName: "Emily Davis",
    position: "UI/UX Designer",
    date: "2024-01-16",
    time: "3:30 PM",
    type: "video",
    status: "completed",
  },
];

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const typeIcons = {
  video: Video,
  phone: Phone,
  'in-person': Calendar
};

export default function InterviewsSection() {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        Upcoming Interviews
      </h2>

      <div className="space-y-4">
        {mockInterviews.map((interview, index) => {
          const TypeIcon = typeIcons[interview.type];

          return (
            <motion.div
              key={interview.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border-2 border-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = '#F97316';
                e.currentTarget.style.borderLeftColor = '#F97316';
                e.currentTarget.style.borderBottomColor = '#3B82F6';
                e.currentTarget.style.borderRightColor = '#3B82F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = 'transparent';
                e.currentTarget.style.borderLeftColor = 'transparent';
                e.currentTarget.style.borderBottomColor = 'transparent';
                e.currentTarget.style.borderRightColor = 'transparent';
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {interview.candidateName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{interview.candidateName}</h3>
                  <p className="text-sm text-gray-600">{interview.position}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(interview.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {interview.time}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[interview.status]}`}>
                    {interview.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <TypeIcon className="w-4 h-4 mr-1" />
                  Join
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}


