const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  // Add other fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
