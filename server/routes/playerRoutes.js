const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Helper function to calculate performance rating
const calculatePerformanceRating = (stats) => {
  const kda = stats.deaths > 0 ? (stats.kills + stats.assists) / stats.deaths : stats.kills + stats.assists;
  return (kda * 0.4 + stats.averageDamagePerRound * 0.6).toFixed(2);
};

// Create a new player
router.post('/', async (req, res) => {
  try {
    const playerData = req.body;
    const performanceRating = calculatePerformanceRating(playerData.statistics);
    playerData.performanceRating = performanceRating;
    playerData.performanceHistory = [{ performanceRating }];
    const player = new Player(playerData);
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().populate('team');
    res.send(players);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific player
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('team');
    if (!player) {
      return res.status(404).send();
    }
    res.send(player);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a player
router.patch('/:id', async (req, res) => {
  try {
    const updates = req.body;
    if (updates.statistics) {
      const performanceRating = calculatePerformanceRating(updates.statistics);
      updates.performanceRating = performanceRating;
      updates.$push = {
        performanceHistory: { performanceRating }
      };
    }
    const player = await Player.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!player) {
      return res.status(404).send();
    }
    res.send(player);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a player
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).send();
    }
    res.send(player);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get player performance history
router.get('/:id/performance-history', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send();
    }
    res.send(player.performanceHistory);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
