export interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber: string;
}

export interface Team {
  id: string;
  name: string;
  createdAt: number;
  players?: Player[];
}
