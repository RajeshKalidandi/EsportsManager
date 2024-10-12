import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayer, updatePlayer } from '../../store/slices/teamSlice';
import Input from '../common/Input';
import Button from '../common/Button';

interface PlayerFormProps {
  teamId: string;
  player?: {
    id: string;
    name: string;
    position: string;
    jerseyNumber: string;
  };
  onSubmit: () => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ teamId, player, onSubmit }) => {
  const [name, setName] = useState(player?.name || '');
  const [position, setPosition] = useState(player?.position || '');
  const [jerseyNumber, setJerseyNumber] = useState(player?.jerseyNumber || '');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const playerData = { name, position, jerseyNumber };
    if (player) {
      dispatch(updatePlayer({ teamId, playerId: player.id, ...playerData }));
    } else {
      dispatch(addPlayer({ teamId, player: { id: Date.now().toString(), ...playerData } }));
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />
      <Input
        label="Jersey Number"
        value={jerseyNumber}
        onChange={(e) => setJerseyNumber(e.target.value)}
        required
      />
      <Button type="submit">{player ? 'Update Player' : 'Add Player'}</Button>
    </form>
  );
};

export default PlayerForm;
