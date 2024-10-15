import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMatchResult } from '../../store/slices/tournamentSlice';
import Button from '../common/Button';
import socket from '../../services/socket';

interface MatchResultFormProps {
  tournamentId: string;
  matchId: string;
  team1: string;
  team2: string;
  onClose: () => void;
}

const MatchResultForm: React.FC<MatchResultFormProps> = ({ tournamentId, matchId, team1, team2, onClose }) => {
  const dispatch = useDispatch();
  const [winner, setWinner] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateMatchResult({ tournamentId, matchId, winner, score }));
    socket.emit('match:update', { tournamentId, matchId, winner, score });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Update Match Result</h3>
      <div className="mb-4">
        <label className="block mb-2">Winner:</label>
        <select
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select winner</option>
          <option value={team1}>{team1}</option>
          <option value={team2}>{team2}</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Score:</label>
        <input
          type="text"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g., 3-2"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button type="button" onClick={onClose} className="mr-2">Cancel</Button>
        <Button type="submit">Update Result</Button>
      </div>
    </form>
  );
};

export default MatchResultForm;
