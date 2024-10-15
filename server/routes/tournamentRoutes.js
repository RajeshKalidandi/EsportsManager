const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

// Create a new tournament
router.post('/', async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).send(tournament);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate('teams');
    res.send(tournaments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific tournament
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id).populate('teams');
    if (!tournament) {
      return res.status(404).send();
    }
    res.send(tournament);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a tournament
router.patch('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tournament) {
      return res.status(404).send();
    }
    res.send(tournament);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a tournament
router.delete('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).send();
    }
    res.send(tournament);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
