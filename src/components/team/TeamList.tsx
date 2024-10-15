import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../store/slices/teamSlice';
import { RootState } from '../../store';
import Card from '../common/Card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TeamList = () => {
  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTeams());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center text-2xl font-bold text-blue-600">Loading teams...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-2xl font-bold text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Teams</h2>
      {Array.isArray(teams) && teams.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {teams.map((team) => (
            <motion.div
              key={team._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={`/team/${team._id}`}>
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="px-6 py-4">
                    <h3 className="font-bold text-xl mb-2 text-blue-800">{team.name}</h3>
                    <p className="text-gray-700 text-base mb-2">
                      Players: {team.players ? team.players.length : 0}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
                      View Details
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-xl text-gray-600">No teams available.</p>
      )}
    </div>
  );
};

export default TeamList;
