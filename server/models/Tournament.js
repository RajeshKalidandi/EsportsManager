const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  round: { type: Number, required: true },
  matchNumber: { type: Number, required: true },
  team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  score: { type: String },
  scheduledTime: { type: Date }
});

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
  prize: { type: Number },
  brackets: [[{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]],
  matches: [MatchSchema]
}, { timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
