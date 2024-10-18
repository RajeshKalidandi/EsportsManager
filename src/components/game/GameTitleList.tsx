import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchGameTitles } from '../../store/slices/gameTitleSlice';

const GameTitleList: React.FC = () => {
  const dispatch = useDispatch();
  const { gameTitles, loading, error } = useSelector((state: RootState) => state.gameTitles);

  useEffect(() => {
    dispatch(fetchGameTitles());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Game Titles</h2>
      <ul>
        {gameTitles.map((game) => (
          <li key={game.id}>{game.name} - {game.genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameTitleList;
