import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchTournaments, addTournament, updateTournament, deleteTournament } from '../../store/slices/tournamentSlice';
import { Button, Input, Dropdown } from '../common';

const TournamentManagement: React.FC = () => {
  const dispatch = useDispatch();
  const tournaments = useSelector((state: RootState) => state.tournaments.tournaments);
  const teams = useSelector((state: RootState) => state.team.teams);

  const [tournamentData, setTournamentData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    teams: []
  });

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTournamentData({ ...tournamentData, [e.target.name]: e.target.value });
  };

  const handleTeamSelect = (selectedTeams: string[]) => {
    setTournamentData({ ...tournamentData, teams: selectedTeams });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTournament(tournamentData));
    setTournamentData({ name: '', startDate: '', endDate: '', teams: [] });
  };

  return (
    <div>
      <h2>Tournament Management</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={tournamentData.name}
          onChange={handleChange}
          placeholder="Tournament Name"
          required
        />
        <Input
          type="date"
          name="startDate"
          value={tournamentData.startDate}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="endDate"
          value={tournamentData.endDate}
          onChange={handleChange}
          required
        />
        <Dropdown
          options={teams.map(team => ({ value: team._id, label: team.name }))}
          value={tournamentData.teams}
          onChange={handleTeamSelect}
          placeholder="Select Teams"
          isMulti
        />
        <Button type="submit">Add Tournament</Button>
      </form>
      <div>
        {tournaments.map(tournament => (
          <div key={tournament._id}>
            <h3>{tournament.name}</h3>
            <p>Start Date: {new Date(tournament.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(tournament.endDate).toLocaleDateString()}</p>
            <p>Teams: {tournament.teams.map(team => team.name).join(', ')}</p>
            <Button onClick={() => dispatch(deleteTournament(tournament._id))}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentManagement;
