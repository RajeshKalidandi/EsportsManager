import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TeamCard from './TeamCard';

const TeamList: React.FC = () => {
  const teams = useSelector((state: RootState) => state.team.teams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamList;