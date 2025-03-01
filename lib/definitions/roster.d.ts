export type TRoster = {
  id?: string;
  name: string;
  campaignId: string;
  playerId: string;
  grandAllianceId?: number;
  factionId?: number;
  pointTotal: number;
  hasFactionTerrain: boolean;
  emberstoneTotal: number;
  emberStoneVault: number;
}

export type TRosterUnit = {
  id: number;
  unitName: string;
  unitCost: number;
  battleWounds: number;
  battleScars: TBattleScar[];
  isReinforced: boolean;
  path: TPath;
  isGeneral: boolean;
  isHero: boolean;
  emberstoneWeapon?: TEmberstoneWeapon;
}
