import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tournament, Match } from '../../types/tournament';
import MatchResultForm from './MatchResultForm';
import socket from '../../services/socket';
import { updateMatch } from '../../store/slices/tournamentSlice';
import { motion, AnimatePresence } from 'framer-motion';

interface TournamentBracketProps {
  tournament: Tournament;
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({ tournament }) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [highlightedTeam, setHighlightedTeam] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('match:updated', (updatedMatch: Match) => {
      dispatch(updateMatch(updatedMatch));
    });

    return () => {
      socket.off('match:updated');
    };
  }, [dispatch]);

  const renderMatch = (match: Match) => (
    <motion.div
      key={match._id}
      className={`p-2 border rounded ${highlightedTeam && (match.team1?.name === highlightedTeam || match.team2?.name === highlightedTeam) ? 'bg-yellow-100' : ''}`}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setHighlightedTeam(match.winner?.name || null)}
      onMouseLeave={() => setHighlightedTeam(null)}
    >
      <p>{match.team1?.name || 'TBD'} vs {match.team2?.name || 'TBD'}</p>
      {match.winner && <p>Winner: {match.winner.name}</p>}
      {match.score && <p>Score: {match.score}</p>}
      {!match.winner && match.team1 && match.team2 && (
        <button onClick={() => setSelectedMatch(match)} className="mt-2 text-blue-500">
          Update Result
        </button>
      )}
    </motion.div>
  );

  const renderRound = (roundMatches: Match[], roundIndex: number) => (
    <div key={roundIndex} className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold">Round {roundIndex + 1}</h3>
      {roundMatches.map(renderMatch)}
    </div>
  );

  return (
    <div className="relative">
      <motion.div 
        className="flex space-x-8 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {tournament.brackets.map(renderRound)}
      </motion.div>
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MatchResultForm
              tournamentId={tournament._id}
              matchId={selectedMatch._id}
              team1={selectedMatch.team1?.name || ''}
              team2={selectedMatch.team2?.name || ''}
              onClose={() => setSelectedMatch(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TournamentBracket;
