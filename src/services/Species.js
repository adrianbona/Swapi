import {swapi} from './Swapi'

export const getSpecie = (url) => {
    return swapi(url).then((specie) => {
        return specie
    })
}
