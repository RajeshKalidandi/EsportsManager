import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayers, deletePlayer } from '../../store/slices/playerSlice';
import { RootState } from '../../store';
import Button from '../common/Button';
import Table from '../common/Table';

const PlayerList: React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.players.players);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deletePlayer(id));
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' },
    { header: 'Position', accessor: 'position' },
    { header: 'Games Played', accessor: 'statistics.gamesPlayed' },
    { header: 'Kills', accessor: 'statistics.kills' },
    { header: 'Deaths', accessor: 'statistics.deaths' },
    { header: 'Assists', accessor: 'statistics.assists' },
    { header: 'KDA', accessor: 'statistics.kda' },
    { header: 'Avg Damage/Round', accessor: 'statistics.averageDamagePerRound' },
    { header: 'Performance Rating', accessor: 'performanceRating' },
    {
      header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }: { row: any }) => (
        <Button onClick={() => handleDelete(row.original._id)}>Delete</Button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Players</h2>
      <Table columns={columns} data={players} />
    </div>
  );
};

export default PlayerList;
