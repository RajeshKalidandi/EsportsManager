export interface Player {
  _id: string;
  name: string;
  position: string;
  jerseyNumber: string;
}

export interface Team {
  _id: string;
  name: string;
  createdAt: Date;
  players?: Player[];
}
