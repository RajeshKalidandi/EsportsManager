const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  matches: [{
    teams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    }],
    score: [Number],
    date: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Tournament', TournamentSchema);
