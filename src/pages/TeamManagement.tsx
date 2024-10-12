import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TeamList from '../components/team/TeamList';
import Button from '../components/common/Button';

const TeamManagement: React.FC = () => {
  const teams = useSelector((state: RootState) => state.team.teams);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Team Management</h1>
      <TeamList teams={teams} />
      <Button>Add New Team</Button>
    </div>
  );
};

export default TeamManagement;
