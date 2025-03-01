import { TCampaign, TCampaignSetting, TCampaignStatus } from "@definitions/campaign";
import Person from "./Person";

class Campaign {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly iconLink: string;
  readonly campaignSetting?: TCampaignSetting;
  readonly campaignSettingId?: number;
  readonly campaignCode: string;
  readonly campaignStatus: TCampaignStatus;
  readonly owner: Person;
  readonly members: Person[];

  constructor(campaign: TCampaign) {
    this.id = campaign.id;
    this.title = campaign.title;
    this.description = campaign.description;
    this.createdAt = new Date(campaign.createdAt);
    this.iconLink = campaign.iconLink;
    this.campaignSetting = campaign.campaignSetting;
    this.campaignSettingId = campaign.campaignSettingId;
    this.campaignCode = campaign.campaignCode;
    this.campaignStatus = campaign.campaignStatus;
    this.owner = new Person(campaign.owner);
    this.members = campaign.members.map(member => new Person(member));
  }

  findMemberById(id: string): Person | undefined {
    return this.members.find(member => member.isSameAs(id));
  }
}

export default Campaign;
