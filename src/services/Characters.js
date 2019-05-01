import {swapi} from './Swapi'

export const getCharacter = (url) => {
    return swapi(url).then((character) => {
        return character
    })
}
