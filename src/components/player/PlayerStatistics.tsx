import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayerStatistics, updatePlayerStatistics } from '../../store/slices/playerSlice';
import { RootState } from '../../store';
import Button from '../common/Button';
import socket from '../../services/socket';

const PlayerStatistics: React.FC = () => {
  const { playerId, tournamentId } = useParams<{ playerId: string; tournamentId: string }>();
  const dispatch = useDispatch();
  const { statistics, status, error } = useSelector((state: RootState) => state.player);
  const [localStats, setLocalStats] = useState(statistics);

  useEffect(() => {
    if (playerId && tournamentId) {
      dispatch(fetchPlayerStatistics({ playerId, tournamentId }));
    }

    socket.on('player:statsUpdated', (updatedStats) => {
      if (updatedStats.playerId === playerId && updatedStats.tournamentId === tournamentId) {
        setLocalStats(updatedStats.statistics);
      }
    });

    return () => {
      socket.off('player:statsUpdated');
    };
  }, [dispatch, playerId, tournamentId]);

  useEffect(() => {
    setLocalStats(statistics);
  }, [statistics]);

  const handleStatUpdate = (statName: string, value: number) => {
    const newStats = { ...localStats, [statName]: (localStats?.[statName] || 0) + value };
    setLocalStats(newStats);
    dispatch(updatePlayerStatistics({ playerId, tournamentId, statistics: newStats }));
    socket.emit('player:updateStats', { playerId, tournamentId, statistics: newStats });
  };

  if (status === 'loading') {
    return <div>Loading statistics...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!localStats) {
    return <div>No statistics available</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Player Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>Kills: {localStats.kills}</p>
          <Button onClick={() => handleStatUpdate('kills', 1)} className="mt-2">+</Button>
        </div>
        <div>
          <p>Deaths: {localStats.deaths}</p>
          <Button onClick={() => handleStatUpdate('deaths', 1)} className="mt-2">+</Button>
        </div>
        <div>
          <p>Assists: {localStats.assists}</p>
          <Button onClick={() => handleStatUpdate('assists', 1)} className="mt-2">+</Button>
        </div>
        <div>
          <p>KDA: {((localStats.kills + localStats.assists) / Math.max(1, localStats.deaths)).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatistics;
