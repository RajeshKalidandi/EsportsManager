import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTournaments } from '../../store/slices/tournamentSlice';
import { RootState } from '../../store';
import Card from '../common/Card';
import { motion } from 'framer-motion';

const TournamentList = () => {
  const dispatch = useDispatch();
  const { tournaments, status, error } = useSelector((state: RootState) => state.tournament);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTournaments());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center text-2xl font-bold text-blue-600">Loading tournaments...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-2xl font-bold text-red-600">Error: {error}</div>;
  }

  const filteredTournaments = filter === 'all' ? tournaments : tournaments.filter(t => t.status === filter);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Tournaments</h2>
      <div className="mb-6 flex justify-center space-x-4">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('Upcoming')} 
          className={`px-4 py-2 rounded-full ${filter === 'Upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setFilter('Ongoing')} 
          className={`px-4 py-2 rounded-full ${filter === 'Ongoing' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Ongoing
        </button>
        <button 
          onClick={() => setFilter('Completed')} 
          className={`px-4 py-2 rounded-full ${filter === 'Completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
      </div>
      {Array.isArray(filteredTournaments) && filteredTournaments.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredTournaments.map((tournament) => (
            <motion.div
              key={tournament._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
