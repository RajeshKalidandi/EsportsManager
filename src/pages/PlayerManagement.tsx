import React, { useState } from 'react';
import PlayerForm from '../components/player/PlayerForm';
import PlayerList from '../components/player/PlayerList';
import PlayerStats from '../components/player/PlayerStats';
import PlayerComparison from '../components/player/PlayerComparison';
import PlayerSearch from '../components/player/PlayerSearch';
import { Tab } from '@headlessui/react';

const PlayerManagement: React.FC = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Player Management</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-4">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Player List
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Add Player
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Player Comparison
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Player Search
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <PlayerList />
          </Tab.Panel>
          <Tab.Panel>
            <PlayerForm />
          </Tab.Panel>
          <Tab.Panel>
            <PlayerComparison />
          </Tab.Panel>
          <Tab.Panel>
            <PlayerSearch onPlayerSelect={setSelectedPlayerId} />
            {selectedPlayerId && <PlayerStats playerId={selectedPlayerId} />}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PlayerManagement;
