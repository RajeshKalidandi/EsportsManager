import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Input from '../common/Input';
import Button from '../common/Button';

interface PlayerSearchProps {
  onPlayerSelect: (playerId: string) => void;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ onPlayerSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const players = useSelector((state: RootState) => state.players.players);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="space-y-2">
        {filteredPlayers.map(player => (
          <Button
            key={player._id}
            onClick={() => onPlayerSelect(player._id)}
            className="w-full text-left"
          >
            {player.name} - {player.position}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PlayerSearch;
