export class Film {
    constructor(
        public id: number,
        public nom: string,
        public imgUrl: string,
        public genre: string,
        public duree: number,
        public realisateur: string,
        public acteurs: string
    ) { }
}
