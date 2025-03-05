import { TUnit } from '@definitions/unit';
import { TRegiment } from '@definitions/roster';
import { TUnitType } from '@definitions/unit';
import { TBattleScar } from '@definitions/unit';
import { TPath } from '@definitions/unit';
import { TEmberstoneWeapon } from '@definitions/unit';

class Unit {
  readonly id: TUnit['id'];
  readonly regimentId: TRegiment['id'];
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

  constructor(unit: TUnit) {
    this.id = unit.id;
    this.regimentId = unit.regimentId;
    this.unitName = unit.unitName;
    this.warscrollName = unit.warscrollName;
    this.unitCost = unit.unitCost;
    this.unitType = unit.unitType;
    this.battleWounds = unit.battleWounds;
    this.battleScars = unit.battleScars;
    this.isReinforced = unit.isReinforced;
    this.path = unit.path;
    this.pathRank = unit.pathRank;
    this.isGeneral = unit.isGeneral;
    this.isHero = unit.isHero;
    this.emberstoneWeapon = unit.emberstoneWeapon;
  }

  public getUnitTypeForIcon(): string {
    return this.isGeneral ? 'general' : this.isHero ? 'hero' : this.unitType?.name?.toLowerCase() || 'infantry';
  }
}

export default Unit;
