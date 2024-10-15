const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const io = require('../socketio').getIO();

// Get player statistics for a tournament
router.get('/:playerId/tournament/:tournamentId', async (req, res) => {
  try {
    const player = await Player.findById(req.params.playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const stats = player.statistics.find(s => s.tournament.toString() === req.params.tournamentId);
    if (!stats) {
      return res.status(404).json({ message: 'Statistics not found for this tournament' });
    }

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update player statistics for a tournament
router.put('/:playerId/tournament/:tournamentId', async (req, res) => {
  try {
    const player = await Player.findById(req.params.playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    let stats = player.statistics.find(s => s.tournament.toString() === req.params.tournamentId);
    if (!stats) {
      stats = { tournament: req.params.tournamentId };
      player.statistics.push(stats);
    }

    // Update statistics
    stats.kills = req.body.kills || stats.kills;
    stats.deaths = req.body.deaths || stats.deaths;
    stats.assists = req.body.assists || stats.assists;
    // Add more statistics as needed

    await player.save();

    // Emit socket event for real-time update
    io.emit('player:statsUpdated', { playerId: player._id, tournamentId: req.params.tournamentId, statistics: stats });

    res.json(stats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
