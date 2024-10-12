import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTeam, updateTeam } from '../../store/slices/teamSlice';
import Input from '../common/Input';
import Button from '../common/Button';

interface TeamFormProps {
  team?: {
    id: string;
    name: string;
  };
  onSubmit: () => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ team, onSubmit }) => {
  const [name, setName] = useState(team?.name || '');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (team) {
      dispatch(updateTeam({ ...team, name }));
    } else {
      dispatch(addTeam({ id: Date.now().toString(), name }));
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit">{team ? 'Update Team' : 'Add Team'}</Button>
    </form>
  );
};

export default TeamForm;
