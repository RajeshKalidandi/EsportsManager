import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { RootState } from '../store';
import socket from '../services/socket';

const AnalyticsPage: React.FC = () => {
  const [tournamentData, setTournamentData] = useState([]);
  const [playerPerformance, setPlayerPerformance] = useState([]);
  const tournaments = useSelector((state: RootState) => state.tournament.tournaments);
  const teams = useSelector((state: RootState) => state.team.teams);

  useEffect(() => {
    const data = tournaments.map(tournament => ({
      name: tournament.name,
      teams: tournament.teams.length,
      prize: tournament.prize
    }));
    setTournamentData(data);

    const playerData = teams.flatMap(team => 
      team.players.map(player => ({
        name: player.name,
        team: team.name,
        kills: player.statistics?.reduce((sum, stat) => sum + stat.kills, 0) || 0,
        deaths: player.statistics?.reduce((sum, stat) => sum + stat.deaths, 0) || 0,
        assists: player.statistics?.reduce((sum, stat) => sum + stat.assists, 0) || 0,
      }))
    );
    setPlayerPerformance(playerData);

    socket.on('analytics:update', (updatedData) => {
      setTournamentData(updatedData.tournamentData);
      setPlayerPerformance(updatedData.playerData);
    });

    return () => {
      socket.off('analytics:update');
    };
  }, [tournaments, teams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics and Reporting</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tournament Overview</h2>
        <BarChart width={600} height={300} data={tournamentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="teams" fill="#8884d8" name="Number of Teams" />
          <Bar yAxisId="right" dataKey="prize" fill="#82ca9d" name="Prize Pool" />
        </BarChart>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Player Performance</h2>
        <LineChart width={600} height={300} data={playerPerformance}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="kills" stroke="#8884d8" />
          <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
          <Line type="monotone" dataKey="assists" stroke="#ffc658" />
        </LineChart>
      </div>
    </div>
  );
};

export default AnalyticsPage;
