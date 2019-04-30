import {Swapi} from '../infrastructure/Swapi'

export class Characters {

    constructor()
    {
        this.swapi = new Swapi()
    }

    getCharacter(url) {
        return this.swapi.get(url).then((character) => {
            return character
        })
    }
}