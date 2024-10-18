import React from 'react';
import { Team } from '../../types/team';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
      <p className="text-gray-600 mb-2">Status: {team.status}</p>
      <p className="text-gray-600 mb-2">Players: {team.players.length}</p>
      <p className="text-gray-600">Created: {new Date(team.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default TeamCard;
