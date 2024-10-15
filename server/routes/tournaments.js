const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const generateBrackets = require('../utils/bracketGenerator');
const io = require('../socketio').getIO();

// GET all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new tournament
router.post('/', async (req, res) => {
  const tournament = new Tournament({
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    prize: req.body.prize,
  });

  try {
    const newTournament = await tournament.save();
    res.status(201).json(newTournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Generate brackets for a tournament
router.post('/:id/generate-brackets', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id).populate('teams');
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    const brackets = generateBrackets(tournament.teams);
    tournament.matches = brackets;
    tournament.status = 'Ongoing';
    await tournament.save();

    res.json(tournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update match result
router.put('/:tournamentId/matches/:matchId', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    const match = tournament.matches.id(req.params.matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    match.winner = req.body.winner;
    match.score = req.body.score;

    // Update next round if necessary
    if (match.round < Math.ceil(Math.log2(tournament.teams.length))) {
      const nextMatchIndex = Math.floor((match.matchNumber - 1) / 2);
      const nextMatch = tournament.matches[nextMatchIndex];
      if (match.matchNumber % 2 === 1) {
        nextMatch.team1 = match.winner;
      } else {
        nextMatch.team2 = match.winner;
      }
    }

    await tournament.save();
    
    // Emit socket event for real-time update
    io.emit('match:updated', { tournamentId: tournament._id, match });

    res.json(tournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
