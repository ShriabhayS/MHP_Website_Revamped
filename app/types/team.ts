export interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
}

export interface Team {
  name: string;
  description: string;
  image: string;
  Team_Leads?: TeamMember[];
  members?: TeamMember[];
}

export interface TeamData {
  sub_teams: Team[];
}

