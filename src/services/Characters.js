export class Characters {

    constructor(swapi)
    {
        this.swapi = swapi
    }

    getCharacter(url) {
        return this.swapi.get(url).then((character) => {
            return character
        })
    }
}