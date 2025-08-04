import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import StudentCard from "@/components/StudentCard";
import SearchFilters from "@/components/SearchFilters";
import InterviewsSection from "@/components/InterviewsSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Calendar, Award, TrendingUp, UserCheck, Target } from "lucide-react";

// Mock students data
const mockStudents = [
  {
    id: "1",
    name: "Md. Najam",
    domain: "MERN Stack Developer",
    skillLevel: "Advanced",
    badges: ["React Expert", "Node.js", "AWS Certified", "Open Source Contributor"],
    location: "Jaipur, Rajasthan",
    experience: "3+ years",
    rating: 4.8,
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Priya Sharma",
    domain: "UI/UX Designer",
    skillLevel: "Intermediate",
    badges: ["Figma Expert", "Design Systems", "User Research"],
    location: "Mumbai, Maharashtra",
    experience: "2+ years",
    rating: 4.6,
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Arjun Patel",
    domain: "Data Scientist",
    skillLevel: "Advanced",
    badges: ["Python", "Machine Learning", "TensorFlow", "Data Visualization"],
    location: "Bangalore, Karnataka",
    experience: "4+ years",
    rating: 4.9,
    lastActive: "3 hours ago",
  },
];

export default function Index() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [filters, setFilters] = useState({
    domain: "All Domains",
    projectExperience: "All Levels",
    skillLevel: "All Skills",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      domain: "All Domains",
      projectExperience: "All Levels",
      skillLevel: "All Skills",
    });
  };

  const handleViewProfile = (studentId) => {
    console.log("View profile for student:", studentId);
  };

  const handleContact = (studentId) => {
    console.log("Contact student:", studentId);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <div className="pt-20 px-4 sm:px-6 py-6">
          {/* Hero Section */}
          <motion.section
            className="hero-gradient rounded-2xl p-6 sm:p-6 mb-8 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <motion.h1
                  className="text-3xl sm:text-4xl font-bold mb-4 select-none"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-[#01BDA5] via-[#43cea2] to-[#FF824C] bg-clip-text text-transparent font-extrabold drop-shadow-lg">
                    UptoSkill
                  </span>{" "}
                  Hiring Dashboard
                </motion.h1>
                <motion.p
                  className="text-base sm:text-xl text-white/90 mb-6 select-none"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Discover talented students, schedule interviews, and build your dream team with our comprehensive hiring platform.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button variant="logo" size="lg" className="text-white shadow-lg hover:shadow-2xl">
                    <Target className="w-5 h-5 mr-2" />
                    Start Hiring
                  </Button>
                  <Button variant="glass" size="lg" className="border-white/30 hover:border-white/50">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </motion.div>
              </div>

              {/* Image */}
              <div className="mt-6 lg:mt-0">
                <motion.img
                  src="/src/assets/boy2.png"
                  alt="Programmer"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[340px] h-auto mx-auto drop-shadow-2xl"
                  style={{ borderRadius: "2rem" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>
            </div>
          </motion.section>

          {/* Stats Overview */}
          <section className="mb-8">
            <motion.h2
              className="text-2xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Hiring Overview
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Students Available"
                value="2,847"
                subtitle="+12% from last month"
                icon={Users}
                color="primary"
                delay={0.1}
              />
              <StatCard
                title="Interviews Scheduled"
                value="24"
                subtitle="This week"
                icon={Calendar}
                color="secondary"
                delay={0.2}
              />
              <StatCard
                title="Mentored Students"
                value="156"
                subtitle="Active mentorships"
                icon={UserCheck}
                color="success"
                delay={0.3}
              />
              <StatCard
                title="Verified Badges"
                value="1,923"
                subtitle="Across all students"
                icon={Award}
                color="warning"
                delay={0.4}
              />
            </div>
          </section>

          {/* Filters + Student Cards */}
          <section className="mb-8">
            <motion.h2
              className="text-2xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Find the Perfect Candidate
            </motion.h2>

            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockStudents.map((student, index) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewProfile={handleViewProfile}
                  onContact={handleContact}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </section>

          {/* Interviews Section */}
          <section className="mb-8">
            <InterviewsSection />
          </section>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-border mt-12">
            <p className="text-muted-foreground">
              © 2024 UptoSkill. Empowering the next generation of talent.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
