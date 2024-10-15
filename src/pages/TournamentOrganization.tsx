import React, { useState } from 'react';
import TournamentList from '../components/tournament/TournamentList';
import TournamentForm from '../components/tournament/TournamentForm';
import Button from '../components/common/Button';

const TournamentOrganization = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Tournament Organization</h1>
      <div className="mb-8 flex justify-end">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          {showForm ? 'Hide Form' : 'Create Tournament'}
        </Button>
      </div>
      {showForm && (
        <div className="mb-8 animate-fade-in-down">
          <TournamentForm onSubmit={() => setShowForm(false)} />
        </div>
      )}
      <TournamentList />
    </div>
  );
};

export default TournamentOrganization;
