import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayers, deletePlayer } from '../../store/slices/playerSlice';
import { RootState } from '../../store';
import Button from '../common/Button';
import Table from '../common/Table';
import Input from '../common/Input';

const PlayerList: React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.players.players);
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);

  const handleDelete = (id: string) => {
    dispatch(deletePlayer(id));
  };

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setFilterText(text);
    const filtered = players.filter(player => 
      player.name.toLowerCase().includes(text.toLowerCase()) ||
      player.position.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const sortedPlayers = React.useMemo(() => {
    let sortableItems = [...filteredPlayers];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredPlayers, sortConfig]);

  const columns = [
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Age', accessor: 'age', sortable: true },
    { header: 'Position', accessor: 'position', sortable: true },
    { header: 'Games Played', accessor: 'statistics.gamesPlayed', sortable: true },
    { header: 'Kills', accessor: 'statistics.kills', sortable: true },
    { header: 'Deaths', accessor: 'statistics.deaths', sortable: true },
    { header: 'Assists', accessor: 'statistics.assists', sortable: true },
    { header: 'KDA', accessor: 'statistics.kda', sortable: true },
    { header: 'Avg Damage/Round', accessor: 'statistics.averageDamagePerRound', sortable: true },
    { header: 'Performance Rating', accessor: 'performanceRating', sortable: true },
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
      <Input
        type="text"
        placeholder="Filter players..."
        value={filterText}
        onChange={handleFilter}
        className="mb-4"
      />
      <Table 
        columns={columns} 
        data={sortedPlayers} 
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default PlayerList;
