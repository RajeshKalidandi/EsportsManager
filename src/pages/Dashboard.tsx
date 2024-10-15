import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Card from '../components/common/Card';
import { Link } from 'react-router-dom';
import LiveMatch from '../components/match/LiveMatch';
import AdvancedAnalytics from '../components/analytics/AdvancedAnalytics';

const Dashboard: React.FC = () => {
  const teams = useSelector((state: RootState) => state.team.teams);
  const players = useSelector((state: RootState) => state.players.players);
  const tournaments = useSelector((state: RootState) => state.tournaments.tournaments);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Teams</h2>
          <p className="text-3xl font-bold">{teams.length}</p>
          <Link to="/team-management" className="text-blue-500 hover:underline mt-2 block">
            Manage Teams
          </Link>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4">Players</h2>
          <p className="text-3xl font-bold">{players.length}</p>
          <Link to="/player-management" className="text-blue-500 hover:underline mt-2 block">
            Manage Players
          </Link>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4">Tournaments</h2>
          <p className="text-3xl font-bold">{tournaments.length}</p>
          <Link to="/tournament-management" className="text-blue-500 hover:underline mt-2 block">
            Manage Tournaments
          </Link>
        </Card>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Live Match</h2>
        <LiveMatch />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Advanced Analytics</h2>
        <AdvancedAnalytics />
      </div>
    </div>
  );
};

export default Dashboard;
