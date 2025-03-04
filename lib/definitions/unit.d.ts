import { TRegiment } from '@definitions/roster';

export type TUnitType = {
  id: number;
  name: string;
  description: string;
}

export type TUnit = {
  id: number;
  regimentId: TRegiment['id'];
  unitName: string;
  warscrollName: string;
  unitCost: number;
  unitType: TUnitType;
  battleWounds: number;
  battleScars: TBattleScar[];
  isReinforced: boolean;
  path: TPath;
  pathRank: number;
  isGeneral: boolean;
  isHero: boolean;
  emberstoneWeapon?: TEmberstoneWeapon;
}

export type TPath = {
  id: number;
  name: string;
}

export type TEmberstoneWeapon = {
  id: number;
  name: string;
}

export type TBattleScar = {
  id: number;
  name: string;
}
