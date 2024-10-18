import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Clock, DollarSign } from 'lucide-react';
import { Tournament } from '../../types/tournament';

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-green-100 text-green-800';
      case 'Ongoing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{tournament.name}</h3>
        <div className="flex items-center mb-2">
          <Calendar size={16} className="mr-2 text-gray-500" />
          <span className="text-sm text-gray-600">
            {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <Users size={16} className="mr-2 text-gray-500" />
          <span className="text-sm text-gray-600">{tournament.teams.length} teams</span>
        </div>
        <div className="flex items-center mb-2">
          <Clock size={16} className="mr-2 text-gray-500" />
          <span className="text-sm text-gray-600">
            {tournament.matches.length} matches
          </span>
        </div>
        <div className="flex items-center mb-4">
          <DollarSign size={16} className="mr-2 text-gray-500" />
          <span className="text-sm text-gray-600">Prize: ${tournament.prize}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(tournament.status)}`}>
            {tournament.status}
          </span>
          <Trophy size={20} className="text-yellow-500" />
        </div>
      </div>
    </motion.div>
  );
};

export default TournamentCard;
