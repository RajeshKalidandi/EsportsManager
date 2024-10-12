import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTeam, updateTeam } from '../../store/slices/teamSlice';
import Input from '../common/Input';
import Button from '../common/Button';

interface TeamFormProps {
  team?: {
    _id: string;
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
      dispatch(createTeam({ name }));
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
      <Button type="submit">{team ? 'Update Team' : 'Create Team'}</Button>
    </form>
  );
};

export default TeamForm;
