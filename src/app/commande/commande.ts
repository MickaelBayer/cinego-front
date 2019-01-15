import { Siege } from '../siege/siege';
import { Seance } from '../seance/seance';

export class Commande {

    constructor(
                public personne,
                public seance: Seance,
                public estPaye: boolean,
                public coutReservation: number,
                public nbPlaces: number,
                public sieges: Siege[]) { }
}
