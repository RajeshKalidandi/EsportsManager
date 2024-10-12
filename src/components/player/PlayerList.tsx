import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePlayer } from '../../store/slices/teamSlice';
import { Player } from '../../types/team';
import Button from '../common/Button';

interface PlayerListProps {
  teamId: string;
  players: Player[];
  onEditPlayer: (player: Player) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ teamId, players, onEditPlayer }) => {
  const dispatch = useDispatch();

  const handleDeletePlayer = (playerId: string) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      dispatch(deletePlayer({ teamId, playerId }));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Players</h3>
      {players.length === 0 ? (
        <p>No players in this team yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {players.map((player) => (
            <li key={player.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{player.name}</p>
                <p className="text-sm text-gray-500">{player.position} - #{player.jerseyNumber}</p>
              </div>
              <div className="space-x-2">
                <Button onClick={() => onEditPlayer(player)}>Edit</Button>
                <Button onClick={() => handleDeletePlayer(player.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerList;
