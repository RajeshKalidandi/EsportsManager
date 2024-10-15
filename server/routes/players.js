const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Update player statistics
router.put('/:playerId/statistics/:tournamentId', async (req, res) => {
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
    stats.kills = (stats.kills || 0) + (req.body.kills || 0);
    stats.deaths = (stats.deaths || 0) + (req.body.deaths || 0);
    stats.assists = (stats.assists || 0) + (req.body.assists || 0);
    // Update more statistics as needed

    await player.save();
    res.json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get player statistics for a tournament
router.get('/:playerId/statistics/:tournamentId', async (req, res) => {
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
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
