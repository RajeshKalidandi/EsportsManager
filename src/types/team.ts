export interface Player {
  _id: string;
  name: string;
  position: string;
  jerseyNumber: string;
}

export interface Team {
  _id: string;
  name: string;
  players: Player[];
  tournaments: string[]; // Array of tournament IDs
  // Add other properties of the Team model here
}
