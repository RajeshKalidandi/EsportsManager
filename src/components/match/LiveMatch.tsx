import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { io, Socket } from 'socket.io-client';
import PlayerStatsChart from '../player/PlayerStatsChart';
import { updatePlayerStats } from '../../store/slices/playerSlice';
import Button from '../common/Button';

const LiveMatch: React.FC = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activePlayers, setActivePlayers] = useState<string[]>([]);
  const players = useSelector((state: RootState) => state.players.players);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
    });

    newSocket.on('playerStatsUpdated', (updatedPlayer) => {
      dispatch(updatePlayerStats(updatedPlayer));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch]);

  const handleStatUpdate = (playerId: string, stat: string) => {
    if (socket && socket.connected) {
      socket.emit('updatePlayerStats', { playerId, stats: { [stat]: 1 } });
    } else {
      console.error('Socket is not connected');
    }
  };

  const togglePlayerActive = (playerId: string) => {
    setActivePlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Live Match</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map(player => (
          <div key={player._id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{player.name}</h3>
            <Button onClick={() => togglePlayerActive(player._id)}>
              {activePlayers.includes(player._id) ? 'Deactivate' : 'Activate'}
            </Button>
            {activePlayers.includes(player._id) && (
              <div>
                <Button onClick={() => handleStatUpdate(player._id, 'kills')}>Kill</Button>
                <Button onClick={() => handleStatUpdate(player._id, 'deaths')}>Death</Button>
                <Button onClick={() => handleStatUpdate(player._id, 'assists')}>Assist</Button>
                <PlayerStatsChart player={player} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMatch;
