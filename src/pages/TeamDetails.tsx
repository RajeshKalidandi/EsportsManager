import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchTeams, updateTeam, addPlayer, updatePlayer, deletePlayer } from '../store/slices/teamSlice';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import TeamForm from '../components/team/TeamForm';
import PlayerForm from '../components/player/PlayerForm';
import PlayerList from '../components/player/PlayerList';
import { Player } from '../types/team';

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const team = useSelector((state: RootState) => state.team.teams.find(t => t.id === id));
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);

  useEffect(() => {
    if (!team) {
      dispatch(fetchTeams());
    }
  }, [dispatch, team]);

  if (!team) return <div>Loading...</div>;

  const handleEditTeam = () => {
    setIsTeamModalOpen(true);
  };

  const handleAddPlayer = (player: { name: string; position: string }) => {
    if (team) {
      dispatch(addPlayer({ teamId: team.id, player }));
      setIsAddingPlayer(false);
    }
  };

  const handleEditPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setIsPlayerModalOpen(true);
  };

  const handlePlayerModalClose = () => {
    setIsPlayerModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleUpdateTeam = (updatedTeam: { name: string }) => {
    if (team) {
      dispatch(updateTeam({ ...team, ...updatedTeam }));
    }
  };

  const handleUpdatePlayer = (updatedPlayer: { id: string; name: string; position: string }) => {
    if (team) {
      dispatch(updatePlayer({ teamId: team.id, player: updatedPlayer }));
    }
  };

  const handleDeletePlayer = (playerId: string) => {
    if (team) {
      dispatch(deletePlayer({ teamId: team.id, playerId }));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{team.name}</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Team Details</h2>
        <p>Created: {new Date(team.createdAt).toLocaleDateString()}</p>
        <Button onClick={handleEditTeam}>Edit Team</Button>
      </Card>
      
      <Card className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Players</h2>
          <Button onClick={() => setIsAddingPlayer(true)}>Add Player</Button>
        </div>
        <PlayerList 
          players={team.players || []} 
          onUpdatePlayer={handleUpdatePlayer} 
          onDeletePlayer={handleDeletePlayer} 
        />
      </Card>

      <Modal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Edit Team</h2>
        <TeamForm 
          team={team} 
          onSubmit={() => setIsTeamModalOpen(false)} 
        />
      </Modal>

      <Modal isOpen={isPlayerModalOpen} onClose={handlePlayerModalClose}>
        <h2 className="text-2xl font-bold mb-4">
          {selectedPlayer ? 'Edit Player' : 'Add Player'}
        </h2>
        <PlayerForm 
          teamId={team.id}
          player={selectedPlayer || undefined}
          onSubmit={handlePlayerModalClose}
        />
      </Modal>
    </div>
  );
};

export default TeamDetails;
