export class Films {

    constructor(swapi)
    {
        this.swapi = swapi

        this.thumbnails = {
            '1' : 'n8V09dDc02KsSN6Q4hC2BX6hN8X.jpg',
            '2' : '2vcNFtrZXNwIcBgH5e2xXCmVR8t.jpg',
            '3' : 'tgr5Pdy7ehZYBqBkN2K7Q02xgOb.jpg',
            '4' : 'btTdmkgIvOi0FFip1sPuZI2oQG6.jpg',
            '5' : '9SKDSFbaM6LuGqG1aPWN3wYGEyD.jpg',
            '6' : 'lrJWyjOVjPhghl4KyAMtOepAxs.jpg',
            '7' : 'weUSwMdQIa3NaXVzwUoIIcAi85d.jpg'
        }
    }

    getFilms() {
        return this.swapi.get().then((films) => {
            return films
        })
    }

    getFilm(url) {
        return this.swapi.get(url).then((film) => {
            return film
        })
    }

    getThumbnail(filmId) {
        return this.url = `https://image.tmdb.org/t/p/w200/${this.thumbnails[filmId]}`
    }
}