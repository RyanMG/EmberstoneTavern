import { TRegiment } from '@definitions/roster';

export type TUnitType = {
  id: number;
  name: string;
  description: string;
}

export type TNewUnit = {
  regimentId: TRegiment['id'];
  unitName: string;
  warscrollName: string;
  unitCost: number;
  unitTypeId: TUnitType['id'];
  battleWounds: number;
  battleScars: TBattleScar[];
  isReinforced: boolean;
  pathId?: TPath['id'];
  pathRank: number;
  isGeneral: boolean;
  isHero: boolean;
}

export type TUnit = TNewUnit & {
  id: number;
  unitNumber: number;
  unitType: TUnitType;
  battleWounds: number;
  battleScars: TBattleScar[];
  isReinforced: boolean;
  path: TPath;
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
