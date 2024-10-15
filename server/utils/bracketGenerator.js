function generateBrackets(teams) {
  const numTeams = teams.length;
  const rounds = Math.ceil(Math.log2(numTeams));
  const totalMatches = Math.pow(2, rounds) - 1;
  const matches = [];

  // Generate empty matches
  for (let i = 0; i < totalMatches; i++) {
    matches.push({
      round: Math.floor(Math.log2(i + 1)) + 1,
      matchNumber: i + 1,
      team1: null,
      team2: null,
      winner: null,
      score: null,
      scheduledTime: null
    });
  }

  // Populate first round with teams
  for (let i = 0; i < numTeams; i++) {
    const matchIndex = Math.floor(i / 2);
    if (i % 2 === 0) {
      matches[matchIndex].team1 = teams[i];
    } else {
      matches[matchIndex].team2 = teams[i];
    }
  }

  return matches;
}

module.exports = generateBrackets;
