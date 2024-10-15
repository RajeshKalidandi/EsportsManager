import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TournamentList from '../components/tournament/TournamentList';
import TournamentForm from '../components/tournament/TournamentForm';
import TournamentBracket from '../components/tournament/TournamentBracket';
import Button from '../components/common/Button';
import { fetchTournaments } from '../store/slices/tournamentSlice';
import { RootState } from '../store';
import socket from '../services/socket';

const TournamentOrganization = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const dispatch = useDispatch();
  const { tournaments } = useSelector((state: RootState) => state.tournament);

  useEffect(() => {
    dispatch(fetchTournaments());

    socket.on('tournament:updated', (updatedTournament) => {
      dispatch({ type: 'tournament/updateTournament', payload: updatedTournament });
    });

    return () => {
      socket.off('tournament:updated');
    };
  }, [dispatch]);

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
      <TournamentList 
        tournaments={tournaments}
        onSelectTournament={setSelectedTournament}
      />
      {selectedTournament && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Tournament Bracket</h2>
          <TournamentBracket tournament={selectedTournament} />
        </div>
      )}
    </div>
  );
};

export default TournamentOrganization;
