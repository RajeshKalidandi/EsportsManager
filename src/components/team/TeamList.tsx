import React from 'react';
import { Team } from '../../types/team';
import TeamCard from './TeamCard';

interface TeamListProps {
  teams: Team[] | null;
  onDeleteTeam: (id: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onDeleteTeam }) => {
  if (!teams || teams.length === 0) {
    return <div>No teams available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <TeamCard key={team._id} team={team} onDelete={onDeleteTeam} />
      ))}
    </div>
  );
};

export default TeamList;
