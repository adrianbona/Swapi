export class Species {

    constructor(swapi)
    {
        this._swapi = swapi
    }

    getSpecie(url) {
        return this._swapi.get(url).then((specie) => {
            return specie
        })
    }
}