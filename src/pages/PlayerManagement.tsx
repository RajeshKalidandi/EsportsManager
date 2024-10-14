import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PlayerForm, PlayerList, PlayerStats } from '../components/player';
import { RootState } from '../store';
import { Button } from '../components/common';

const PlayerManagement: React.FC = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const players = useSelector((state: RootState) => state.players.players);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Player Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Player</h2>
          <PlayerForm />
        </div>
        <div>
          <PlayerList />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Player Statistics</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          {players.map(player => (
            <Button key={player._id} onClick={() => setSelectedPlayerId(player._id)}>
              {player.name}
            </Button>
          ))}
        </div>
        {selectedPlayerId && <PlayerStats playerId={selectedPlayerId} />}
      </div>
    </div>
  );
};

export default PlayerManagement;
