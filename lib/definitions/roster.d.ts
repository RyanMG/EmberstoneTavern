export type TRoster = {
  id: string;
  name: string;
  campaignId: string;
  userId: string;
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
