export type TCampaignStatus = 'ACTIVE' | 'COMPLETE';

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
  owner: TPerson;
  members: TPerson[];
}

export type TCampaignSetting = {
  id: number;
  name?: string;
}