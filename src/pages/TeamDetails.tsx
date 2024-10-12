import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const team = useSelector((state: RootState) => 
    state.team.teams.find(t => t.id === id)
  );

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{team.name}</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Team Details</h2>
        {/* Add more team details here */}
        <Button>Edit Team</Button>
      </Card>
      {/* Add a section for team members/players here */}
    </div>
  );
};

export default TeamDetails;
