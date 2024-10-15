import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamDetails } from '../store/slices/teamSlice';
import { RootState } from '../store';
import Card from '../components/common/Card';
import PlayerStatistics from '../components/player/PlayerStatistics';
import PlayerForm from '../components/team/PlayerForm';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentTeam, status, error } = useSelector((state: RootState) => state.team);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

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
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base mb-4">{currentTeam.description}</p>
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Players</h2>
          {currentTeam.players && currentTeam.players.length > 0 ? (
            <ul className="list-disc list-inside">
              {currentTeam.players.map((player) => (
                <li key={player._id} className="mb-2">
                  {player.name} - {player.position}
                  <Button onClick={() => {
                    setEditingPlayer(player);
                    setShowPlayerForm(true);
                  }} className="ml-2">Edit</Button>
                  <PlayerStatistics playerId={player._id} tournamentId={id} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No players in this team yet.</p>
          )}
          <Button onClick={() => {
            setEditingPlayer(null);
            setShowPlayerForm(true);
          }} className="mt-4">Add Player</Button>
        </div>
      </Card>
      {showPlayerForm && (
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4">
            <h3 className="text-xl font-bold mb-4 text-blue-800">
              {editingPlayer ? 'Edit Player' : 'Add New Player'}
            </h3>
            <PlayerForm 
              teamId={currentTeam._id} 
              player={editingPlayer}
              onSubmit={() => {
                setShowPlayerForm(false);
                setEditingPlayer(null);
              }} 
            />
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default TeamDetails;
