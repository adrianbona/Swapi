import {Swapi} from '../infrastructure/Swapi'

export class Species {

    constructor()
    {
        this.swapi = new Swapi()
    }

    getSpecie(url) {
        return this.swapi.get(url).then((specie) => {
            return specie
        })
    }
}