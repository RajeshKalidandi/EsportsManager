import React from 'react';
import { motion } from 'framer-motion';
import { Tournament } from '../../types/tournament';
import TournamentCard from './TournamentCard';

interface TournamentListProps {
  tournaments: Tournament[];
}

const TournamentList: React.FC<TournamentListProps> = ({ tournaments }) => {
  if (tournaments.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No tournaments found. Create a new tournament to get started!
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {tournaments.map((tournament, index) => (
        <motion.div
          key={tournament._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TournamentCard tournament={tournament} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TournamentList;
