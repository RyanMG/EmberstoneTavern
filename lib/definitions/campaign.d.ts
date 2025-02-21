export type TCampaignStatus = 'ACTIVE' | 'COMPLETE';

export type TCampaign = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  iconLink: string;
  campaignStatus: TCampaignStatus;
  owner: TPerson;
  members: TPerson[];
}