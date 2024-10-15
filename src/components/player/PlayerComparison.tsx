import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import PlayerStatsChart from './PlayerStatsChart';
import Dropdown from '../common/Dropdown';

const PlayerComparison: React.FC = () => {
  const players = useSelector((state: RootState) => state.players.players);
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');

  const player1 = players.find(p => p._id === player1Id);
  const player2 = players.find(p => p._id === player2Id);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Player Comparison</h2>
      <div className="flex space-x-4 mb-4">
        <Dropdown
          options={players.map(p => ({ value: p._id, label: p.name }))}
          value={player1Id}
          onChange={(e) => setPlayer1Id(e.target.value)}
          placeholder="Select Player 1"
        />
        <Dropdown
          options={players.map(p => ({ value: p._id, label: p.name }))}
          value={player2Id}
          onChange={(e) => setPlayer2Id(e.target.value)}
          placeholder="Select Player 2"
        />
      </div>
      {player1 && player2 && (
        <div className="grid grid-cols-2 gap-4">
          <PlayerStatsChart player={player1} />
          <PlayerStatsChart player={player2} />
        </div>
      )}
    </div>
  );
};

export default PlayerComparison;
