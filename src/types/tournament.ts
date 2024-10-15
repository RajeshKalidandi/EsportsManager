import { Team } from './team';

export interface Match {
  _id: string;
  round: number;
  matchNumber: number;
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
  score: string | null;
  scheduledTime: Date | null;
}

export interface Tournament {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  teams: Team[];
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  prize: number;
  brackets: Match[][];
  matches: Match[];
}
