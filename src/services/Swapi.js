export const swapi = (url) => {
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