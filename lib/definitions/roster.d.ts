import { TGrandAlliance, TFaction } from '@definitions/sigmar';
import { TUnit } from '@definitions/unit';

export type TRoster = {
  id?: string;
  name: string;
  general: TUnit;
  campaignId: string;
  playerId: string;
  grandAllianceId?: number;
  grandAlliance?: TGrandAlliance;
  factionId?: number;
  faction?: TFaction;
  pointTotal: number;
  hasFactionTerrain: boolean;
  emberstoneTotal: number;
  emberStoneVault: number;
  regiments: TRegiment[];
}

export type TRegiment = {
  id: number;
  rosterId: string;
  units: TUnit[];
}
