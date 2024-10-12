import React from 'react';
import { Team } from '../../store/slices/teamSlice';
import Card from '../common/Card';
import Button from '../common/Button';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
        <p className="text-gray-600 mb-4">Team ID: {team.id}</p>
        {/* Add more team details here */}
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm">Edit</Button>
        <Button variant="secondary" size="sm">View Details</Button>
      </div>
    </Card>
  );
};

export default TeamCard;