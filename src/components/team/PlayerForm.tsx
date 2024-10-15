import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayerAsync, updatePlayerAsync } from '../../store/slices/teamSlice';
import Input from '../common/Input';
import Button from '../common/Button';

interface PlayerFormProps {
  teamId: string;
  player?: {
    _id: string;
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
      dispatch(updatePlayerAsync({ teamId, player: { _id: player._id, ...playerData } }));
    } else {
      dispatch(addPlayerAsync({ teamId, player: playerData }));
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
