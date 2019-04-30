export class Swapi {

    get(url = '') {
        if (!url) {
            url = 'https://swapi.co/api/films/'
        }

        return (
            fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    return responseJson
                })
                .catch((error) => {
                    console.warn(error)
                })
        )
    }
}