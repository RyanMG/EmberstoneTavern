import { TRegiment, TRoster } from '@definitions/roster';
import Unit from '@classes/Unit';

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
    this.units = regiment.units.map(unit => new Unit(unit));
  }
}

export default Regiment;
