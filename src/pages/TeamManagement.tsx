import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, createTeam, deleteTeam } from '../store/slices/teamSlice';
import { RootState } from '../store';
import TeamList from '../components/team/TeamList';
import TeamForm from '../components/team/TeamForm';

const TeamManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleCreateTeam = (team: { name: string }) => {
    dispatch(createTeam(team));
  };

  const handleDeleteTeam = (id: string) => {
    dispatch(deleteTeam(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Team Management</h1>
      <TeamForm onSubmit={handleCreateTeam} />
      <TeamList teams={teams} onDeleteTeam={handleDeleteTeam} />
    </div>
  );
};

export default TeamManagement;
