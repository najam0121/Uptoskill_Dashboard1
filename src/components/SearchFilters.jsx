import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Filter, RotateCcw } from 'lucide-react';

const domains = [
  'All Domains',
  'Web Development',
  'AI/ML',
  'Data Science',
  'Mobile Development',
  'DevOps',
  'UI/UX Design',
  'Cybersecurity',
  'Cloud Computing'
];

const experienceLevels = [
  'All Levels',
  'Entry Level',
  'Mid Level',
  'Senior Level'
];

const skillLevels = [
  'All Skills',
  'Beginner',
  'Intermediate',
  'Advanced'
];

export default function SearchFilters({ filters, onFilterChange, onClearFilters }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Candidates</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Domain Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
          <select
            value={filters.domain}
            onChange={(e) => onFilterChange('domain', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
          <select
            value={filters.projectExperience}
            onChange={(e) => onFilterChange('projectExperience', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Skill Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
          <select
            value={filters.skillLevel}
            onChange={(e) => onFilterChange('skillLevel', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {skillLevels.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Clear Filters
        </Button>
      </div>
    </motion.div>
  );
}

