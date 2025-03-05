import { TRoster } from "@definitions/roster";
import { TCampaign } from "@definitions/campaign";
import { TPerson } from "@definitions/person";
import { TGrandAlliance, TFaction } from "@definitions/sigmar";

import Unit from "@classes/Unit";
import Regiment from "@classes/Regiment";

class Roster {
  readonly id: TRoster['id'];
  name: string;
  readonly general: Unit;
  readonly campaignId: TCampaign['id'];
  readonly playerId: TPerson['id'];
  readonly grandAlliance: TGrandAlliance;
  readonly grandAllianceId: TGrandAlliance['id'];
  readonly faction: TFaction;
  readonly factionId: TFaction['id'];
  pointTotal: number;
  hasFactionTerrain: boolean;
  emberstoneTotal: number;
  emberStoneVault: number;
  regiments: Regiment[];

  constructor(roster: TRoster) {
    this.id = roster.id!;
    this.name = roster.name;
    this.general = roster.general;
    this.campaignId = roster.campaignId;
    this.playerId = roster.playerId;
    this.grandAllianceId = roster.grandAllianceId!;
    this.grandAlliance = roster.grandAlliance!;
    this.factionId = roster.factionId!;
    this.faction = roster.faction!;
    this.pointTotal = roster.pointTotal;
    this.hasFactionTerrain = roster.hasFactionTerrain;
    this.emberstoneTotal = roster.emberstoneTotal;
    this.emberStoneVault = roster.emberStoneVault;
    this.regiments = roster.regiments.map(regiment => new Regiment(regiment));
  }
}

export default Roster;