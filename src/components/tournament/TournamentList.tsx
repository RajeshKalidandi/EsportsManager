import React from 'react';
import { Tournament } from '../../types/tournament';
import Card from '../common/Card';
import { motion } from 'framer-motion';

interface TournamentListProps {
  tournaments: Tournament[];
  onSelectTournament: (tournament: Tournament) => void;
}

const TournamentList: React.FC<TournamentListProps> = ({ tournaments, onSelectTournament }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Tournaments</h2>
      {tournaments.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {tournaments.map((tournament) => (
            <motion.div
              key={tournament._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectTournament(tournament)}
            >
              <Card className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="px-6 py-4">
                  <h3 className="font-bold text-xl mb-2 text-blue-800">{tournament.name}</h3>
                  <p className="text-gray-700 text-base mb-2">
                    Start: {new Date(tournament.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    End: {new Date(tournament.endDate).toLocaleDateString()}
                  </p>
                  <p className={`text-base font-semibold ${
                    tournament.status === 'Upcoming' ? 'text-yellow-600' :
                    tournament.status === 'Ongoing' ? 'text-green-600' :
                    'text-red-600'
                  }`}>
                    Status: {tournament.status}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
                    Prize: ${tournament.prize}
                  </span>
                  <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
                    Teams: {tournament.teams.length}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-xl text-gray-600">No tournaments available.</p>
      )}
    </div>
  );
};

export default TournamentList;
