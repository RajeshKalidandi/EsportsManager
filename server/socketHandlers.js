const Tournament = require('./models/Tournament');
const Player = require('./models/Player');

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle team updates
    socket.on('team:update', (teamData) => {
      socket.broadcast.emit('team:updated', teamData);
    });

    // Handle tournament updates
    socket.on('tournament:update', (tournamentData) => {
      socket.broadcast.emit('tournament:updated', tournamentData);
    });

    // Handle match updates
    socket.on('match:update', async (matchData) => {
      try {
        const tournament = await Tournament.findById(matchData.tournamentId);
        if (tournament) {
          const match = tournament.matches.id(matchData.matchId);
          if (match) {
            match.winner = matchData.winner;
            match.score = matchData.score;
            await tournament.save();
            io.emit('match:updated', { tournamentId: tournament._id, match });
          }
        }
      } catch (error) {
        console.error('Error updating match:', error);
      }
    });

    // Handle player statistics updates
    socket.on('player:updateStats', async (data) => {
      try {
        const player = await Player.findById(data.playerId);
        if (player) {
          let stats = player.statistics.find(s => s.tournament.toString() === data.tournamentId);
          if (!stats) {
            stats = { tournament: data.tournamentId };
            player.statistics.push(stats);
          }
          Object.assign(stats, data.statistics);
          await player.save();
          io.emit('player:statsUpdated', { playerId: player._id, tournamentId: data.tournamentId, statistics: stats });
        }
      } catch (error) {
        console.error('Error updating player statistics:', error);
      }
    });

    // Handle analytics updates
    socket.on('analytics:request', async () => {
      try {
        const tournaments = await Tournament.find().populate('teams');
        const players = await Player.find().populate('team');
        
        const tournamentData = tournaments.map(tournament => ({
          name: tournament.name,
          teams: tournament.teams.length,
          prize: tournament.prize
        }));

        const playerData = players.map(player => ({
          name: player.name,
          team: player.team ? player.team.name : 'No Team',
          kills: player.statistics.reduce((sum, stat) => sum + stat.kills, 0),
          deaths: player.statistics.reduce((sum, stat) => sum + stat.deaths, 0),
          assists: player.statistics.reduce((sum, stat) => sum + stat.assists, 0),
        }));

        socket.emit('analytics:update', { tournamentData, playerData });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = setupSocketHandlers;
