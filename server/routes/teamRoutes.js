const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Player = require('../models/Player');
const auth = require('../middleware/auth');

// Get all teams for the current user
router.get('/', auth, async (req, res) => {
  try {
    const teams = await Team.find({ ownerId: req.user.uid });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new team
router.post('/', auth, async (req, res) => {
  const team = new Team({
    name: req.body.name,
    players: req.body.players,
    ownerId: req.user.uid
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
router.get('/:id', auth, async (req, res) => {
  console.log(`Attempting to fetch team with ID: ${req.params.id}`);
  try {
    const team = await Team.findOne({ _id: req.params.id, ownerId: req.user.uid }).populate('players');
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

// Add a player to a team
router.post('/:teamId/players', auth, async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.teamId, ownerId: req.user.uid });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const player = new Player({
      name: req.body.name,
      position: req.body.position,
      jerseyNumber: req.body.jerseyNumber,
      team: team._id
    });

    const newPlayer = await player.save();
    team.players.push(newPlayer._id);
    await team.save();

    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a player in a team
router.put('/:teamId/players/:playerId', auth, async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.teamId, ownerId: req.user.uid });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const player = await Player.findOne({ _id: req.params.playerId, team: team._id });
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    if (req.body.name) player.name = req.body.name;
    if (req.body.position) player.position = req.body.position;
    if (req.body.jerseyNumber) player.jerseyNumber = req.body.jerseyNumber;

    const updatedPlayer = await player.save();
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a player from a team
router.delete('/:teamId/players/:playerId', auth, async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.teamId, ownerId: req.user.uid });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const player = await Player.findOneAndDelete({ _id: req.params.playerId, team: team._id });
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    team.players = team.players.filter(p => p.toString() !== req.params.playerId);
    await team.save();

    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
