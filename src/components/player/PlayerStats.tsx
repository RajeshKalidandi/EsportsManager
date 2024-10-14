import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card } from '../common';

interface PlayerStatsProps {
  playerId: string;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ playerId }) => {
  const player = useSelector((state: RootState) =>
    state.players.players.find(p => p._id === playerId)
  );

  if (!player) return <div>Player not found</div>;

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">{player.name} Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Games Played:</strong> {player.statistics.gamesPlayed}</p>
          <p><strong>Kills:</strong> {player.statistics.kills}</p>
          <p><strong>Deaths:</strong> {player.statistics.deaths}</p>
          <p><strong>Assists:</strong> {player.statistics.assists}</p>
        </div>
        <div>
          <p><strong>KDA:</strong> {player.statistics.kda.toFixed(2)}</p>
          <p><strong>Avg Damage/Round:</strong> {player.statistics.averageDamagePerRound.toFixed(2)}</p>
          <p><strong>Performance Rating:</strong> {player.performanceRating.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
};

export default PlayerStats;
