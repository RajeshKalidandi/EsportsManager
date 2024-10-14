import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayer } from '../../store/slices/playerSlice';
import Button from '../common/Button';
import Input from '../common/Input';

const PlayerForm: React.FC = () => {
  const dispatch = useDispatch();
  const [playerData, setPlayerData] = useState({
    name: '',
    age: '',
    position: '',
    statistics: {
      gamesPlayed: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      averageDamagePerRound: 0,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPlayerData(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: Number(value)
        }
      }));
    } else {
      setPlayerData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const calculatePerformanceRating = (stats) => {
    const kda = stats.deaths > 0 ? (stats.kills + stats.assists) / stats.deaths : stats.kills + stats.assists;
    return (kda * 0.4 + stats.averageDamagePerRound * 0.6).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const performanceRating = calculatePerformanceRating(playerData.statistics);
    dispatch(addPlayer({ ...playerData, performanceRating: Number(performanceRating) }));
    setPlayerData({
      name: '',
      age: '',
      position: '',
      statistics: {
        gamesPlayed: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        averageDamagePerRound: 0,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="name"
        value={playerData.name}
        onChange={handleChange}
        placeholder="Player Name"
        required
      />
      <Input
        type="number"
        name="age"
        value={playerData.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <Input
        type="text"
        name="position"
        value={playerData.position}
        onChange={handleChange}
        placeholder="Position"
        required
      />
      <h3 className="text-lg font-semibold">Statistics</h3>
      <Input
        type="number"
        name="statistics.gamesPlayed"
        value={playerData.statistics.gamesPlayed}
        onChange={handleChange}
        placeholder="Games Played"
      />
      <Input
        type="number"
        name="statistics.kills"
        value={playerData.statistics.kills}
        onChange={handleChange}
        placeholder="Kills"
      />
      <Input
        type="number"
        name="statistics.deaths"
        value={playerData.statistics.deaths}
        onChange={handleChange}
        placeholder="Deaths"
      />
      <Input
        type="number"
        name="statistics.assists"
        value={playerData.statistics.assists}
        onChange={handleChange}
        placeholder="Assists"
      />
      <Input
        type="number"
        name="statistics.averageDamagePerRound"
        value={playerData.statistics.averageDamagePerRound}
        onChange={handleChange}
        placeholder="Average Damage Per Round"
      />
      <Button type="submit">Add Player</Button>
    </form>
  );
};

export default PlayerForm;
