export type TCampaignStatus = 'ACTIVE' | 'COMPLETE';
import Person from "@classes/Person";
import { TPerson } from "@definitions/person";

export type TCampaign = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  iconLink: string;
  campaignSetting?: TCampaignSetting;
  campaignSettingId?: number;
  campaignCode: string;
  campaignStatus: TCampaignStatus;
  owner: Person;
  members: Person[];
}

export type TCampaignSetting = {
  id: number;
  name?: string;
}

export type TCampaignInvite = {
  id: number;
  inviteDate: string;
  campaignOverview: TCampaign;
  owner: TPerson;
  player: TPerson;
}

export type TNewCampaignGame = {
  campaignId: string;
  gameDate: string;
  winner: TPerson['id'];
  opponent: TPerson['id'];
  missionPlayed: string;
  twist: string;
  rounds: number;
  winnerScore: number;
  opponentScore: number;
}

export type TCampaignGame = {
  campaignId: string;
  winner: Person;
  opponent: Person;
  missionPlayed: string;
  twist: string;
  rounds: number;
  winnerScore: number;
  opponentScore: number;
}
