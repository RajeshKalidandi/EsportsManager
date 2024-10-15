import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamDetails } from '../store/slices/teamSlice';
import { RootState } from '../store';
import Card from '../components/common/Card';
import { motion } from 'framer-motion';

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentTeam, status, error } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    if (id) {
      dispatch(fetchTeamDetails(id));
    }
  }, [id, dispatch]);

  if (status === 'loading') {
    return <div className="text-center text-2xl font-bold text-blue-600">Loading team details...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-2xl font-bold text-red-600">Error: {error}</div>;
  }

  if (!currentTeam) {
    return <div className="text-center text-2xl font-bold text-red-600">Team not found</div>;
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">{currentTeam.name}</h1>
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base mb-4">{currentTeam.description}</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Players</h2>
          {currentTeam.players && currentTeam.players.length > 0 ? (
            <ul className="list-disc list-inside">
              {currentTeam.players.map((player) => (
                <li key={player._id} className="mb-2">
                  {player.name} - {player.position}
                </li>
              ))}
            </ul>
          ) : (
            <p>No players in this team yet.</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TeamDetails;
