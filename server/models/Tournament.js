const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
  prize: { type: Number },
  matches: [{
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    date: Date,
    result: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
