const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  statistics: {
    gamesPlayed: { type: Number, default: 0 },
    kills: { type: Number, default: 0 },
    deaths: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    kda: { type: Number, default: 0 },
    averageDamagePerRound: { type: Number, default: 0 },
  },
  performanceRating: { type: Number, default: 0 },
  performanceHistory: [{
    date: { type: Date, default: Date.now },
    performanceRating: Number
  }]
}, {
  timestamps: true
});

// Calculate KDA before saving
PlayerSchema.pre('save', function(next) {
  if (this.statistics.deaths > 0) {
    this.statistics.kda = (this.statistics.kills + this.statistics.assists) / this.statistics.deaths;
  } else {
    this.statistics.kda = this.statistics.kills + this.statistics.assists;
  }
  next();
});

module.exports = mongoose.model('Player', PlayerSchema);
