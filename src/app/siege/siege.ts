import { Seance } from '../seance/seance';

export class Siege {

    constructor (public id: number,
                 public estReserve: boolean,
                 public type: string,
                 public numSiege: number,
                 public numRangee: number,
                 public seance: Seance
    ) { }
}
