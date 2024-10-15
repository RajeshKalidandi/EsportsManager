import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

export const setupSocketListeners = (dispatch: any) => {
  socket.on('team:updated', (teamData) => {
    // Dispatch an action to update the team in the Redux store
    dispatch({ type: 'team/updateTeam', payload: teamData });
  });

  socket.on('tournament:updated', (tournamentData) => {
    // Dispatch an action to update the tournament in the Redux store
    dispatch({ type: 'tournament/updateTournament', payload: tournamentData });
  });
};

export const emitTeamUpdate = (teamData: any) => {
  socket.emit('team:update', teamData);
};

export const emitTournamentUpdate = (tournamentData: any) => {
  socket.emit('tournament:update', tournamentData);
};

export default socket;
