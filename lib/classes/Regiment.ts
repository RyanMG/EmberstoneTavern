import { TRegiment, TRoster } from '@definitions/roster';
import Unit from '@classes/Unit';
import { TUnit } from '@definitions/unit';

class Regiment {
  readonly id: TRegiment['id'];
  readonly rosterId: TRoster['id'];
  readonly regimentNumber: number;
  regimentName: string;
  isGeneral: boolean;
  isAuxiliary: boolean;
  units: Unit[];

  constructor(regiment: TRegiment) {
    this.id = regiment.id;
    this.rosterId = regiment.rosterId;
    this.regimentNumber = regiment.regimentNumber;
    this.regimentName = regiment.regimentName;
    this.isGeneral = regiment.isGeneral;
    this.isAuxiliary = regiment.isAuxiliary;
    this.units = this.sortAndCreateUnits(regiment.units);
  }

  private sortAndCreateUnits(units: TUnit[]): Unit[] {
    return units
      .sort((a, b) => {
        return a.isGeneral ? -1 : a.isHero ? -1 : a.unitNumber - b.unitNumber;
      })
      .map(unit => new Unit(unit));
  }

  public getRegimentName(): string {
    if (this.regimentName) {
      if (this.isGeneral) return `${this.regimentName} (General's Regiment)`;
      if (this.isAuxiliary) return `${this.regimentName} (Auxiliary Regiment)`;
      return this.regimentName;
    }

    if (this.isGeneral) return "General's Regiment";
    if (this.isAuxiliary) return "Auxiliary Regiment";
    return `Regiment ${this.regimentNumber}`;
  }

  public isDeletable(): boolean {
    return this.isGeneral === false;
  }

  public isFull(): boolean {
    return this.isGeneral ? this.units.length >= 5 : this.units.length >= 4;
  }
}

export default Regiment;
