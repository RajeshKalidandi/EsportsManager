const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const Player = mongoose.model('Player');

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new team
router.post('/', async (req, res) => {
  const team = new Team({
    name: req.body.name,
    players: req.body.players
  });

  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add more routes for updating and deleting teams

// GET a single team by ID
router.get('/:id', async (req, res) => {
  console.log(`Attempting to fetch team with ID: ${req.params.id}`);
  try {
    const team = await Team.findById(req.params.id).populate('players');
    if (!team) {
      console.log(`Team not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: 'Team not found' });
    }
    console.log(`Team found: ${team.name}`);
    res.json(team);
  } catch (err) {
    console.error(`Error fetching team: ${err.message}`);
    console.error(err.stack);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

module.exports = router;
